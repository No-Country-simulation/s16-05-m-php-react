<?php

namespace App\Entity;

use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model\Operation;
use ApiPlatform\OpenApi\Model\Response;
use App\Dto\ResetPasswordDto;
use App\Dto\UserEmailDto;
use App\Repository\UserRepository;
use App\State\ResetPasswordRequestProcessor;
use App\State\ResetPasswordProcessor;
use App\State\PostUserProcessor;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[UniqueEntity(fields: ['email'], groups: ['register'])]
#[Post(
    processor: PostUserProcessor::class,
    denormalizationContext: ['groups' => ['register']],
    normalizationContext: ['groups' => ['register:read']],
    validationContext: ['groups' => ['register']]
)]
#[Post(
    name: 'reset_password_request',
    uriTemplate: '/user/reset-password-request',
    processor: ResetPasswordRequestProcessor::class,
    input: UserEmailDto::class,
    status: 200,
    openapi: new Operation(
        operationId: 'reset_password_request',
        summary: 'Create a reset password request',
        description: 'Create a reset password request, an email will be sent to the specified email address with a code to reset the password.',
        responses: [
            '200' => new Response(
                description: 'An Email will be sent to the specified email address with a code to reset the password.',
            ),            
            '404' => new Response(
                description: 'The address specified does not exist in the system.',
            ),
        ]
    )
)]
#[Post(
    name: 'reset_password',
    uriTemplate: '/user/reset-password',
    processor: ResetPasswordProcessor::class,
    input: ResetPasswordDto::class,
    status: 200,
    openapi: new Operation(
        operationId: 'reset_password',
        summary: 'Reset user password',
        description: 'Reset user password, a code is required to reset the password (this code should be sent previously to the user email).',
        responses: [
            '200' => new Response(
                description: 'The password has been successfully reset.',
            ),
            '403' => new Response(
                description: 'The code specified is invalid or expired.',
            ),
        ]
    )
)]
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['register:read'])]
    private ?int $id = null;
    
    #[ORM\Column(length: 180)]
    #[Groups(['register', 'register:read'])]    
    #[Assert\NotBlank(groups: ['register'])]
    #[Assert\Email(groups: ['register'])]
    private ?string $email = null;
    
    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    #[Groups(['register:read'])]
    private array $roles = [];
    
    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    #[Groups(['register'])]
    #[Assert\NotBlank(groups: ['register'])]
    #[Assert\Length(min: 6, groups: ['register'])]
    private ?string $password = null;

    /**
     * @var Collection<int, Order>
     */
    #[ORM\OneToMany(targetEntity: Order::class, mappedBy: 'user')]
    private Collection $orders;

    #[ORM\Column(length: 255)]
    #[Groups(['register', 'register:read'])]    
    #[Assert\NotBlank(groups: ['register'])]
    private ?string $username = null;

    public function __construct()
    {
        $this->orders = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     *
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection<int, Order>
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): static
    {
        if (!$this->orders->contains($order)) {
            $this->orders->add($order);
            $order->setUser($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): static
    {
        if ($this->orders->removeElement($order)) {
            // set the owning side to null (unless already changed)
            if ($order->getUser() === $this) {
                $order->setUser(null);
            }
        }

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }
}

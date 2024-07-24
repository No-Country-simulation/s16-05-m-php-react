<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Dto\CategoryImageDto;
use App\Repository\CategoryRepository;
use App\State\CategoryImageProcessor;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[GetCollection(normalizationContext: ['groups' => ['category:read']])]
#[Post(
    uriTemplate: '/categories/{id}/image',
    inputFormats: ['multipart' => ['multipart/form-data']],
    normalizationContext: ['groups' => ['category:read']],
    input: CategoryImageDto::class,
    processor: CategoryImageProcessor::class
)]
#[ApiResource(
    normalizationContext: ['groups' => ['category:read'], 'skip_null_values' => false],
    denormalizationContext: ['groups' => ['category:write']],
    security: 'is_granted("ROLE_ADMIN")',
    operations: [
        new Post(),
        new Put(),
        new Delete()
    ]
)]
#[ORM\Entity(repositoryClass: CategoryRepository::class)]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['category:read', 'product:read'])]
    private ?int $id = null;

    #[Assert\NotBlank()]
    #[ORM\Column(length: 255)]
    #[Groups(['category:read', 'product:read', 'category:write'])]
    private ?string $name = null;

    /**
     * @var Collection<int, Product>
     */
    #[ORM\ManyToMany(targetEntity: Product::class, mappedBy: 'categories')]
    private Collection $products;

    #[Assert\NotBlank()]
    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['category:read', 'product:read', 'category:write'])]
    private ?string $phrase = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $image_path = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $image_name = null;

    #[Groups(['category:read', 'product:read'])]
    private ?string $image = null;

    public function __construct()
    {
        $this->products = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, Product>
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(Product $product): static
    {
        if (!$this->products->contains($product)) {
            $this->products->add($product);
            $product->addCategory($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): static
    {
        if ($this->products->removeElement($product)) {
            $product->removeCategory($this);
        }

        return $this;
    }

    public function getPhrase(): ?string
    {
        return $this->phrase;
    }

    public function setPhrase(?string $phrase): static
    {
        $this->phrase = $phrase;

        return $this;
    }

    public function getImagePath(): ?string
    {
        return $this->image_path;
    }

    public function setImagePath(?string $image_path): static
    {
        $this->image_path = $image_path;

        return $this;
    }

    public function getImageName(): ?string
    {
        return $this->image_name;
    }

    public function setImageName(?string $image_name): static
    {
        $this->image_name = $image_name;

        return $this;
    }

    public function getImage()
    {
        return $this->image;
    }
}

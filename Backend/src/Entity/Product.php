<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Dto\ProductDto;
use App\State\ProductProcessor;


#[GetCollection(
    normalizationContext: ['groups' => ['product:read']],
)]
#[Post(
    denormalizationContext: ['groups' => ['product:write']],
    normalizationContext: ['groups' => ['product:read']],
    validationContext: ['groups' => ['table:write:validation']],
    input: ProductDto::class,
    processor: ProductProcessor::class
)]
#[Delete()]
#[Put(
    denormalizationContext: ['groups' => ['product:write']],
    normalizationContext: ['groups' => ['product:read']],
    input: ProductDto::class,
    processor: ProductProcessor::class
)]
#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ORM\Table(name: 'product')]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['product:read'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['product:read'])]
    private ?float $price = null;

    #[ORM\Column]
    #[Groups(['product:read'])]
    private ?bool $is_available = null;

    /**
     * @var Collection<int, OrderProduct>
     */
    #[ORM\OneToMany(targetEntity: OrderProduct::class, mappedBy: 'product')]
    private Collection $orderProducts;

    public function __construct()
    {
        $this->orderProducts = new ArrayCollection();
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

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getIsAvailable(): ?bool
    {
        return $this->is_available;
    }

    public function setIsAvailable(bool $is_available): static
    {
        $this->is_available = $is_available;

        return $this;
    }

    /**
     * @return Collection<int, OrderProduct>
     */
    public function getOrderProducts(): Collection
    {
        return $this->orderProducts;
    }

    public function addOrderProduct(OrderProduct $orderProduct): static
    {
        if (!$this->orderProducts->contains($orderProduct)) {
            $this->orderProducts->add($orderProduct);
            $orderProduct->setProduct($this);
        }

        return $this;
    }

    public function removeOrderProduct(OrderProduct $orderProduct): static
    {
        if ($this->orderProducts->removeElement($orderProduct)) {
            // set the owning side to null (unless already changed)
            if ($orderProduct->getProduct() === $this) {
                $orderProduct->setProduct(null);
            }
        }

        return $this;
    }
}

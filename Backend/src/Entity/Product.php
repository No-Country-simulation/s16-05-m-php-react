<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Dto\ProductDto;
use App\Dto\ProductImageDto;
use App\State\ProductImageProcessor;
use App\State\ProductProcessor;


#[GetCollection(
    normalizationContext: ['groups' => ['product:read'], 'skip_null_values' => false],
)]
#[GetCollection(
    uriTemplate: '/categories/{categoryId}/products',
    uriVariables: [
        'categoryId' => new Link(fromClass: Category::class, toProperty: 'categories', description: 'Category Id'),
    ]
)]
#[Post(
    security: 'is_granted("ROLE_ADMIN")',
    denormalizationContext: ['groups' => ['product:write']],
    normalizationContext: ['groups' => ['product:read']],
    validationContext: ['groups' => ['product:write:validation']],
    input: ProductDto::class,
    processor: ProductProcessor::class
)]
#[Post(
    uriTemplate: '/products/{id}/image',
    inputFormats: ['multipart' => ['multipart/form-data']],
    validationContext: ['groups' => ['product-image:validation']],
    denormalizationContext: ['groups' => ['product-image:write']],
    normalizationContext: ['groups' => ['product:read']],
    input: ProductImageDto::class,
    processor: ProductImageProcessor::class
)]
#[Delete(
    security: 'is_granted("ROLE_ADMIN")',
)]
#[Put(
    security: 'is_granted("ROLE_ADMIN")',
    denormalizationContext: ['groups' => ['product:write']],
    normalizationContext: ['groups' => ['product:read']],
    validationContext: ['groups' => ['product:write:validation']],
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

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $image_path = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $image_name = null;

    #[Groups(['product:read'])]
    private ?string $image = null;

    /**
     * @var Collection<int, Category>
     */
    #[ORM\ManyToMany(targetEntity: Category::class, inversedBy: 'products')]
    #[Groups(['product:read'])]
    private Collection $categories;
    
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['product:read'])]
    private ?string $description = null;

    public function __construct()
    {
        $this->orderProducts = new ArrayCollection();
        $this->categories = new ArrayCollection();
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

    public function getImagePath(): ?string
    {
        return $this->image_path;
    }

    public function setImagePath(string $image_path): static
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

    public function getImage(): ?string
    {
        return $this->image;
    }

    /**
     * @return Collection<int, Category>
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category): static
    {
        if (!$this->categories->contains($category)) {
            $this->categories->add($category);
        }

        return $this;
    }

    public function removeCategory(Category $category): static
    {
        $this->categories->removeElement($category);

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }
}

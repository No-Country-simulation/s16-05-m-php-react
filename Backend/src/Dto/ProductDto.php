<?php

namespace App\Dto;

use ApiPlatform\Metadata\ApiProperty;
use App\Entity\Category;
use App\Entity\Product;
use App\Validator\UniqueDifferent;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints\Count;
use Symfony\Component\Validator\Constraints\GreaterThan;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Validator\Constraints\Type;

#[UniqueEntity(fields: ['name'], entityClass: Product::class, groups: ['product:post:validation'])]
#[UniqueDifferent(field: 'name', class: Product::class, groups: ['product:put:validation'])]
class ProductDto
{
    #[Groups(['product:read'])]
    private $id;

    #[ApiProperty(
        openapiContext: [
            'type' => 'string',
            'example' => 'arroz',
            'description' => 'El nombre del producto debe ser único',
        ]
    )]
    #[NotBlank(groups: ['product:write:validation'])]
    #[Groups(['product:write'])]
    private $name;

    #[ApiProperty(
        openapiContext: [
            'type' => 'float',
            'example' => 100.315,
            'minimum' => 0.01,
            'description' => 'El precio puede ser float',
        ]
    )]
    #[NotBlank(groups: ['product:write:validation'])]
    #[Type(type: ['integer', 'float'], groups: ['product:write:validation'])]
    #[GreaterThan(0, groups: ['product:write:validation'])]
    #[Groups(['product:write'])]
    private $price;

    #[ApiProperty(
        openapiContext: [
            'type' => 'string',
            'example' => 'Arroz blanco, preparado con los granos más puros y selectos.',
            'description' => 'Descripción del producto',
        ]
    )]
    #[NotBlank(groups: ['product:write:validation'])]
    #[Groups(['product:write'])]
    private $description;
    
    #[ApiProperty(
        openapiContext: [
            'type' => 'boolean',
            'example' => true,
            'description' => 'El estado debe ser un bolean con true o false'
        ]
    )]
    #[NotNull(groups: ['product:write:validation'])]
    #[Type(type: 'boolean', groups: ['product:write:validation'])]
    #[Groups(['product:write'])]
    private $is_available;

    /**
     * @var Collection<int, Category>
     */
    #[ApiProperty(
        openapiContext: [
            'type' => 'array',
            'minItems' => 1,
            'items' => ['type' => 'string'],
            'example' => ['/api/categories/1', '/api/categories/2'],
            'description' => 'Lista de URI de categorias',
        ]
    )]
    #[Count(min: 1, groups: ['product:write:validation'])]
    #[Groups(['product:write'])]
    private Collection $categories;

    public function __construct()
    {
        $this->categories = new ArrayCollection ();
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    public function getIsAvailable()
    {
        return $this->is_available;
    }

    public function setIsAvailable($is_available)
    {
        $this->is_available = $is_available;

        return $this;
    }

    /**
     * @return Collection<int, Category>
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }    
    
    public function setCategories(Collection $categories): static
    {
        $this->categories = $categories;

        return $this;
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

    public function getDescription()
    {
        return $this->description;
    }

    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }
}
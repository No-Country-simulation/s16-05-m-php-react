<?php

namespace App\Dto;

use ApiPlatform\Metadata\ApiProperty;
use App\Entity\Product;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints\GreaterThan;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Type;
use Symfony\Component\Validator\Constraints\Unique;

#[UniqueEntity(fields: ['name'], entityClass: Product::class, groups: ['product:write:validation'])]
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
            'type' => 'boolean',
            'example' => true,
            'description' => 'El estado debe ser un bolean con true o false'
        ]
    )]
    #[NotBlank(groups: ['product:write:validation'])]
    #[Type(type: 'boolean', groups: ['product:write:validation'])]
    #[Groups(['product:write'])]
    private $is_available;

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
}
<?php

namespace App\Dto;

use App\Entity\Product;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints\GreaterThan;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Type;

#[UniqueEntity(fields: ['name'], entityClass: Product::class, groups: ['product:write:validation'])]
class ProductDto
{
    #[Groups(['product:read'])]
    private $id;

    #[NotBlank(groups: ['product:write:validation'])]
    #[Groups(['product:write'])]
    private $name;

    #[NotBlank(groups: ['product:write:validation'])]
    #[Type(type: ['integer', 'float'], groups: ['product:write:validation'])]
    #[GreaterThan(0, groups: ['product:write:validation'])]
    #[Groups(['product:write'])]
    private $price;
    
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
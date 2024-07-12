<?php

namespace App\Dto;

use App\Entity\Table;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints\GreaterThan;
use Symfony\Component\Validator\Constraints\LessThanOrEqual;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Type;

#[UniqueEntity(fields: ['name'], entityClass: Table::class, groups: ['table:write:validation'])]
class TableDto
{
  #[Groups(['table:read'])]
  private $id;

  #[NotBlank(groups: ['table:write:validation'])]
  #[Groups(['table:write'])]
  private $name;

  #[NotBlank(groups: ['table:write:validation'])]
  #[Type(type: 'integer', groups: ['table:write:validation'])]
  #[GreaterThan(0, groups: ['table:write:validation'])]
  #[Groups(['table:write'])]
  private $capacity;
  
  #[NotBlank(groups: ['table:write:validation'])]
  #[Type(type: 'integer', groups: ['table:write:validation'])]
  #[GreaterThan(0, groups: ['table:write:validation'])]
  #[LessThanOrEqual(propertyPath: 'capacity', groups: ['table:write:validation'])]
  #[Groups(['table:write'])]
  private $min_required_capacity;

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

  public function getCapacity()
  {
    return $this->capacity;
  }

  public function setCapacity($capacity)
  {
    $this->capacity = $capacity;

    return $this;
  }

  public function getMinRequiredCapacity()
  {
    return $this->min_required_capacity;
  }

  public function setMinRequiredCapacity($min_required_capacity)
  {
    $this->min_required_capacity = $min_required_capacity;

    return $this;
  }
}

<?php

namespace App\Dto;

use App\Entity\Table;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints\GreaterThan;
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
  private $available_sits;

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

  public function getAvailableSits()
  {
    return $this->available_sits;
  }

  public function setAvailableSits($available_sits)
  {
    $this->available_sits = $available_sits;

    return $this;
  }
}

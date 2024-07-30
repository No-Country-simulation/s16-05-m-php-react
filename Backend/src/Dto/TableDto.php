<?php

namespace App\Dto;

use ApiPlatform\Metadata\ApiProperty;
use App\Entity\Table;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints\GreaterThan;
use Symfony\Component\Validator\Constraints\GreaterThanOrEqual;
use Symfony\Component\Validator\Constraints\LessThanOrEqual;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Type;

#[UniqueEntity(fields: ['name'], entityClass: Table::class, groups: ['table:write:validation'])]
class TableDto
{
  #[Groups(['table:read'])]
  private $id;

  #[ApiProperty(
    openapiContext: [
      'type' => 'string',
      'example' => 'Mesa 1',
      'description' => 'Nombre de la mesa. Debe ser único',
    ]
  )]
  #[NotBlank(groups: ['table:write:validation'])]
  #[Groups(['table:write'])]
  private $name;

  #[ApiProperty(
    openapiContext: [
      'type' => 'integer',
      'minimum' => 1,
      'example' => 4,
      'description' => 'Capacidad máxima de la mesa. Menor o igual que la capacidad minima requerida',
    ]
  )]
  #[NotBlank(groups: ['table:write:validation'])]
  #[Type(type: 'integer', groups: ['table:write:validation'])]
  #[GreaterThan(0, groups: ['table:write:validation'])]
  #[GreaterThanOrEqual(
    propertyPath: 'min_required_capacity',
    groups: ['table:write:validation'],
    message: 'table.capacity.greater_than_or_equal'
  )]
  #[Groups(['table:write'])]
  private $capacity;

  #[ApiProperty(
    openapiContext: [
      'type' => 'integer',
      'minimum' => 1,
      'example' => 1,
      'description' => 'Cantidad minima requerida de personas para poder ser reservada esta mesa. Debe ser menor o igual que la capacidad de la mesa',
    ]
  )]
  #[NotBlank(groups: ['table:write:validation'])]
  #[Type(type: 'integer', groups: ['table:write:validation'])]
  #[GreaterThan(0, groups: ['table:write:validation'])]
  #[LessThanOrEqual(
    propertyPath: 'capacity',
    groups: ['table:write:validation'],
    message: 'table.min_required_capacity.less_than_or_equal'
  )]
  #[Groups(['table:write'])]
  private $min_required_capacity;

  #[ApiProperty(
    openapiContext: [
      'type' => 'integer',
      'minimum' => 1,
      'example' => 1,
      'description' => 'Cantidad de personas que van a asistir a la mesa. Debe ser mayor o igual que la capacidad minima requerida',
    ]
  )]
  #[NotBlank(groups: ['table:write:validation'])]
  #[Type(type: 'integer', groups: ['table:write:validation'])]
  #[GreaterThan(0, groups: ['table:write:validation'])]
  #[GreaterThanOrEqual(
    propertyPath: 'min_required_capacity',
    groups: ['table:write:validation'],
    message: 'table.min_required_capacity.less_than_or_equal'
  )]
  #[Groups(['table:write'])]
  private $attendee_count;

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

  public function getAttendeeCount()
  {
    return $this->attendee_count;
  }

  public function setAttendeeCount($attendee_count)
  {
    $this->attendee_count = $attendee_count;

    return $this;
  }
}

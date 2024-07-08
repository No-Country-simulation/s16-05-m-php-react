<?php

namespace App\Exception;

use ApiPlatform\Metadata\Exception\ProblemExceptionInterface;

class EmailIsNotRegisteredException extends \Exception implements ProblemExceptionInterface
{

  public function __construct() {
    parent::__construct('The inputted email is not registered');
  }

  public function getType(): string
  {
    return 'Email is not registered';
  }

  public function getTitle(): ?string
  {
    return 'Email is not registered';
  }

  public function getStatus(): ?int
  {
    return 404;
  }

  public function getDetail(): ?string
  {
    return $this->getMessage();
  }

  public function getInstance(): ?string
  {
    return null;
  }
}

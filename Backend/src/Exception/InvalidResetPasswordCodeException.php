<?php

namespace App\Exception;

use ApiPlatform\Metadata\Exception\ProblemExceptionInterface;

class InvalidResetPasswordCodeException extends \Exception implements ProblemExceptionInterface
{
  public function __construct()
  {
    parent::__construct('Invalid reset password code');
  }

  public function getType(): string
  {
      return 'Invalid code';
  }
  public function getTitle(): ?string
  {
      return null;
  }
  public function getStatus(): ?int
  {
      return 403;
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

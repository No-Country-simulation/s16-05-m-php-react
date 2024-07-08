<?php

namespace App\Dto;

use Symfony\Component\Validator\Constraints\Email;

class UserEmailDto
{
  #[Email(message: 'The email "{{ value }}" is not a valid email.')]
  private string $email;

  public function getEmail()
  {
    return $this->email;
  }

  public function setEmail($email)
  {
    $this->email = $email;

    return $this;
  }
}

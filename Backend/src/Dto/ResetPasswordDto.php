<?php

namespace App\Dto;

use ApiPlatform\Metadata\ApiProperty;
use Symfony\Component\Validator\Constraints\NotBlank;

class ResetPasswordDto
{
  #[ApiProperty(
    openapiContext: [
        'type' => 'string',
        'example' => '4asd4654d4asd654ds8sa9qw984e754ad61432',
        'description' => 'token para reset la contraseña',
      ]
  )]
  #[NotBlank()]
  private string $code;
  
  #[ApiProperty(
    openapiContext: [
        'type' => 'string',
        'example' => '123456asd',
        'description' => 'Nueva contraseña de usuario',
      ]
  )]
  #[NotBlank()]
  private string $newPassword;

  public function getCode()
  {
    return $this->code;
  }

  public function setCode($code)
  {
    $this->code = $code;

    return $this;
  }

  public function getNewPassword()
  {
    return $this->newPassword;
  }

  public function setNewPassword($newPassword)
  {
    $this->newPassword = $newPassword;

    return $this;
  }
}

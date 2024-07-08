<?php

namespace App\Dto;

use Symfony\Component\Validator\Constraints\NotBlank;

class ResetPasswordDto
{
  #[NotBlank()]
  private string $code;
  
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

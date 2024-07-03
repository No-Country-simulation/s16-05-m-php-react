<?php

namespace App\Service;

use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserService
{

  public function __construct(
    private UserPasswordHasherInterface $passwordHasher
  ) {
  }

  public function hashPassword(User $user, string $plaintextPassword): string
  {
    $hashedPassword = $this->passwordHasher->hashPassword(
      $user,
      $plaintextPassword
    );

    return $hashedPassword;
  }
}

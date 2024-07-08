<?php

namespace App\Service;

use App\Entity\ResetPasswordRequest;
use App\Entity\User;
use App\Exception\InvalidResetPasswordCodeException;
use App\Repository\ResetPasswordRequestRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ResetPasswordRequestService
{

  public function __construct(
    private ResetPasswordRequestRepository $resetPasswordRequestRepository,
    private UserRepository $userRepository
  ){}

  public function createResetPasswordRequest(string $email): string
  {
    $code = $this->randomCode();
    $hashedCode = $this->hashCode($code);
    $user = $this->userRepository->findOneBy(['email' => $email]);

    if ($user === null) {
      throw new NotFoundHttpException(sprintf('User with email "%s" not found', $email));
    }

    $this->resetPasswordRequestRepository->createResetPasswordRequest($user, $hashedCode);

    return $code;
  }

  public function findByCodeAndGetUser(string $code): User
  {
    $hashedCode = $this->hashCode($code);
    $resetPasswordRequest = $this->resetPasswordRequestRepository->findByHashedCode($hashedCode);

    if ($resetPasswordRequest === null) {
      throw new InvalidResetPasswordCodeException;
    }
    
    return $resetPasswordRequest->getUser();
  }

  public function deleteResetPasswordRequest(string $code): void
  {
    $hashedCode = $this->hashCode($code);
    $this->resetPasswordRequestRepository->deleteByHashedCodeIfExist($hashedCode);
  }

  public function isExpiredResetPasswordRequest(ResetPasswordRequest $resetPasswordRequest): bool
  {
    return $resetPasswordRequest->getExpiredAt() < new \DateTimeImmutable();
  }

  public function hashCode(string $code): string
  {
    return hash('sha256', $code);
  }

  public function randomCode(): string
  {
    return bin2hex(random_bytes(16));
  }
}

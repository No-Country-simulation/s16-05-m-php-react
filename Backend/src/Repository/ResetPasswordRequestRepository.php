<?php

namespace App\Repository;

use App\Entity\ResetPasswordRequest;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ResetPasswordRequest>
 */
class ResetPasswordRequestRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ResetPasswordRequest::class);
    }

    public function createResetPasswordRequest(User $user, string $hashedCode): void
    {
        $resetPasswordRequest = new ResetPasswordRequest();
        $resetPasswordRequest->setUser($user);
        $resetPasswordRequest->setHashedCode($hashedCode);
        $resetPasswordRequest->setExpiredAt(new \DateTimeImmutable('+1 hour'));
        $this->getEntityManager()->persist($resetPasswordRequest);
        $this->getEntityManager()->flush();
    }

    public function findByHashedCode(string $hashedCode): ?ResetPasswordRequest
    {
        return $this->findOneBy(['hashedCode' => $hashedCode]);
    }
    
    public function deleteByHashedCodeIfExist(string $hashedCode): void
    {
        $resetPasswordRequest = $this->findByHashedCode($hashedCode);

        if ($resetPasswordRequest === null) return;

        $this->getEntityManager()->remove($resetPasswordRequest);
        $this->getEntityManager()->flush();
    }
}

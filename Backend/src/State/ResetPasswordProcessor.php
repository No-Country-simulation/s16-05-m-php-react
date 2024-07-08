<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Dto\ChangePasswordDto;
use App\Dto\MessageDto;
use App\Repository\ResetPasswordRequestRepository;
use App\Repository\UserRepository;
use App\Service\ResetPasswordRequestService;
use App\Service\UserService;
use Psr\Log\LoggerInterface;

class ResetPasswordProcessor implements ProcessorInterface
{
    public function __construct(
        private UserService $userService,
        private UserRepository $userRepository,
        private ResetPasswordRequestRepository $resetPasswordRequestRepository,
        private ResetPasswordRequestService $resetPasswordRequestService,
    ) {}

    /**
     * @param ChangePasswordDto $data
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): void
    {
        $user = $this->resetPasswordRequestService->findByCodeAndGetUser($data->getCode());
        $hashedPassword = $this->userService->hashPassword($user, $data->getNewPassword());
        $this->userRepository->upgradePassword($user, $hashedPassword);
        $this->resetPasswordRequestService->deleteResetPasswordRequest($data->getCode());
    }
}

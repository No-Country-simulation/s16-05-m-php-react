<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Dto\CreateResetPasswordRequestDto;
use App\Service\MailerService;
use App\Service\ResetPasswordRequestService;

class ResetPasswordRequestProcessor implements ProcessorInterface
{
    public function __construct(
        private ResetPasswordRequestService $resetPasswordRequestService,
        private MailerService $mailerService
    ) {}

    /**
     * @param CreateResetPasswordRequestDto $data
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        $code = $this->resetPasswordRequestService
            ->createResetPasswordRequest($data->getEmail());
        $emailContent = "Su código de cambio de contraseña es: $code";
        $this->mailerService->sendEmail($data->getEmail(), 'Solicitud de cambio de contraseña', $emailContent);

        return $code;
    }
}

<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\Metadata\Put;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Reservation;
use App\Repository\ReservationRepository;

class ReservationProcessor implements ProcessorInterface
{
    public function __construct(
        private ReservationRepository $reservationRepository
    ) {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): Reservation
    {
        if ($operation instanceof Put) {
            $reservation = $this->reservationRepository->updateFromDto($data, $uriVariables['id']);
            return $reservation;
        }

        $reservation = $this->reservationRepository->saveFromDto($data);
        return $reservation;
    }
}

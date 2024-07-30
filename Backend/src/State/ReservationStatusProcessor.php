<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Dto\ReservationStatusDto;
use App\Entity\Reservation;
use App\Repository\ReservationRepository;
use App\Util\ReservationStatuses;

class ReservationStatusProcessor implements ProcessorInterface
{
    public function __construct(
        private ReservationRepository $reservationRepository
    ) {}

    /**
     * @param ReservationStatusDto $data
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): Reservation
    {
        $statusId = ReservationStatuses::getIdByName(
            $data->getStatus()
        );

        return $this->reservationRepository->updateReservationStatus(
            $uriVariables['id'],
            $statusId
        );
    }
}

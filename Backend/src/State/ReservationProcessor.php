<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\Metadata\Put;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Reservation;
use App\Repository\ReservationRepository;
use App\Service\MailerService;
use App\Service\ReservationService;
use App\Util\StaticRestaurantInfo;

class ReservationProcessor implements ProcessorInterface
{
    public function __construct(
        private ReservationRepository $reservationRepository,
        private ReservationService $reservationService,
        private MailerService $mailerService
    ) {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): Reservation
    {
        if ($operation instanceof Put) {
            $reservation = $this->reservationRepository->updateFromDto($data, $uriVariables['id']);
            return $reservation;
        }
        $code = $this->reservationService->validateAndGenerateCode();
        $reservation = $this->reservationRepository->saveFromDto($data, $code);

        $base64id = base64_encode($reservation->getId());
        $confirmLink = $_ENV['FRONTEND_URL'] . '/codeConfirmReservation/' . $base64id . '/confirm';
        $cancelLink = $_ENV['FRONTEND_URL'] . '/codeConfirmReservation/' . $base64id . '/cancel';

        $this->mailerService
            ->sendEmailWithTemplate(
                $reservation->getOwnerEmail(), 
                "Confirmación de reservación en " . StaticRestaurantInfo::NAME, 
                "reservation.html.twig",
                [
                    'code' => $code,
                    'confirmLink' => $confirmLink,
                    'cancelLink' => $cancelLink,
                    'first_name' => $reservation->getOwnerFirstName(),
                    'last_name' => $reservation->getOwnerLastName(),
                    'date' => $reservation->getDate()->format('Y-m-d'),
                    'time' => $reservation->getTime()->format('H:i'),
                    'table' => $reservation->getTable()->getName(),
                ]
            );

        return $reservation;
    }
}

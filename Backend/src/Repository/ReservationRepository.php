<?php

namespace App\Repository;

use App\Dto\ReservationDto;
use App\Entity\Reservation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use ReservationService;

/**
 * @extends ServiceEntityRepository<Reservation>
 */
class ReservationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Reservation::class);
    }

    public function saveFromDto(ReservationDto $reservationDto): Reservation
    {
        $reservationService = new ReservationService($this);
        $code = $reservationService->code();
        $reservation = new Reservation();
        $reservation->setDateFrom($reservationDto->getDateFrom());
        $reservation->setDateTo($reservationDto->getDateTo());
        $reservation->setCode($code);
        $reservation->setStatus($reservationDto->getStatus());
        $reservation->setOwnerFirstName($reservationDto->getOwnerFirstName());
        $reservation->setOwnerLastName($reservationDto->getOwnerLastName());
        $reservation->setOwnerPhoneNumber($reservationDto->getOwnerPhoneNumber());
        $reservation->setOwnerEmail($reservationDto->getOwnerEmail());
        $reservation->setCreatedAt($reservationDto->getCreatedAt());
        $reservation->setUpdateAt($reservationDto->getUpdateAt());
        $reservation->setTable($reservationDto->getTable());

        $this->getEntityManager()->persist($reservation);
        $this->getEntityManager()->flush();

        return $reservation;
    }

    public function updateFromDto(ReservationDto $reservationDto, int $id): Reservation
    {
        $reservation = $this->find($id);

        $reservation->setDateFrom($reservationDto->getDateFrom());
        $reservation->setDateTo($reservationDto->getDateTo());
        $reservation->setStatus($reservationDto->getStatus());
        $reservation->setOwnerFirstName($reservationDto->getOwnerFirstName());
        $reservation->setOwnerLastName($reservationDto->getOwnerLastName());
        $reservation->setOwnerPhoneNumber($reservationDto->getOwnerPhoneNumber());
        $reservation->setOwnerEmail($reservationDto->getOwnerEmail());
        $reservation->setUpdateAt($reservationDto->getUpdateAt());
        $reservation->setTable($reservationDto->getTable());

        $this->getEntityManager()->persist($reservation);
        $this->getEntityManager()->flush();

        return $reservation;
    }
}

<?php

namespace App\Repository;

use App\Dto\ReservationDto;
use App\Entity\Reservation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Service\ReservationService;

/**
 * @extends ServiceEntityRepository<Reservation>
 */
class ReservationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Reservation::class);
    }

    public function saveFromDto(ReservationDto $reservationDto, string $code): Reservation
    {
        $reservation = new Reservation();
        $reservation->setDateFrom($reservationDto->getDateFrom());
        $reservation->setDateTo($reservationDto->getDateTo());
        $reservation->setCode($code);
        $reservation->setOwnerFirstName($reservationDto->getOwnerFirstName());
        $reservation->setOwnerLastName($reservationDto->getOwnerLastName());
        $reservation->setOwnerPhoneNumber($reservationDto->getOwnerPhoneNumber());
        $reservation->setOwnerEmail($reservationDto->getOwnerEmail());
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
        $reservation->setOwnerFirstName($reservationDto->getOwnerFirstName());
        $reservation->setOwnerLastName($reservationDto->getOwnerLastName());
        $reservation->setOwnerPhoneNumber($reservationDto->getOwnerPhoneNumber());
        $reservation->setOwnerEmail($reservationDto->getOwnerEmail());
        $reservation->setUpdateAt(new \DateTimeImmutable);
        $reservation->setTable($reservationDto->getTable());

        $this->getEntityManager()->persist($reservation);
        $this->getEntityManager()->flush();

        return $reservation;
    }

    public function existsCode(string $code): bool
    {
        return null !== $this->findOneBy(['code' => $code]);
    }

    public function existReservationByDateRange(\DateTimeImmutable $dateFrom, \DateTimeImmutable $dateTo): bool
    {
        return null !== $this->createQueryBuilder('r')
            ->where('r.date_from BETWEEN :dateFrom AND :dateTo')
            ->orWhere('r.date_to BETWEEN :dateFrom AND :dateTo')
            ->orWhere(':dateFrom BETWEEN r.date_from AND r.date_to')
            ->orWhere(':dateTo BETWEEN r.date_from AND r.date_to')
            ->setParameter('dateFrom', $dateFrom)
            ->setParameter('dateTo', $dateTo)
            ->getQuery()
            ->setMaxResults(1)
            ->getOneOrNullResult();
    }
}

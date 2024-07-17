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

        $reservation->setDate($reservationDto->getDate());
        $reservation->setTimeFrom($reservationDto->getTimeFrom());
        $reservation->setTimeTo($reservationDto->getTimeTo());
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

    public function uptimeFromDto(ReservationDto $reservationDto, int $id): Reservation
    {
        /**
         * @var Reservation $reservation
         */
        $reservation = $this->find($id);

        $reservation->setDate($reservationDto->getDate());
        $reservation->setTimeFrom($reservationDto->getTimeFrom());
        $reservation->setTimeTo($reservationDto->getTimeTo());
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

    public function existReservationByDateAndTimeRange(\DateTimeImmutable $date, \DateTimeImmutable $timeFrom, \DateTimeImmutable $timeTo): bool
    {
        return null !== $this->createQueryBuilder('r')
            ->where('r.time_from BETWEEN :timeFrom AND :timeTo')
            ->orWhere('r.time_to BETWEEN :timeFrom AND :timeTo')
            ->orWhere(':timeFrom BETWEEN r.time_from AND r.time_to')
            ->orWhere(':timeTo BETWEEN r.time_from AND r.time_to')
            ->andWhere('r.date = :date')
            ->setParameter('timeFrom', $timeFrom->add(\DateInterval::createFromDateString('1 minute'))->format('H:i'))
            ->setParameter('timeTo', $timeTo->sub(\DateInterval::createFromDateString('1 minute'))->format('H:i'))
            ->setParameter('date', $date->format('Y-m-d'))
            ->getQuery()
            ->setMaxResults(1)
            ->getOneOrNullResult();
    }
}

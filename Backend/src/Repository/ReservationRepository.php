<?php

namespace App\Repository;

use App\Dto\ReservationDto;
use App\Entity\Reservation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Service\ReservationService;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

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
        $reservation->setTime($reservationDto->getTime());
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
        /**
         * @var Reservation $reservation
         */
        $reservation = $this->find($id);

        $reservation->setDate($reservationDto->getDate());
        $reservation->setTime($reservationDto->getTime());
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

    public function existReservationByDateAndTime(\DateTimeImmutable $date, \DateTimeImmutable $time, int $tableId): bool
    {
        return null !== $this->createQueryBuilder('r')
            ->where('r.date = :date')
            ->andWhere('r.time = :time')
            ->andWhere('r.table = :table')
            ->setParameter('date', $date->format('Y-m-d'))
            ->setParameter('time', $time->format('H:i'))
            ->setParameter('table', $tableId)
            ->getQuery()
            ->setMaxResults(1)
            ->getOneOrNullResult();
    }

    public function updateReservationStatus(int $id, int $statusId): Reservation
    {
        /** @var Reservation $reservation */
        $reservation = $this->find($id);

        if (null === $reservation) {
            throw new NotFoundHttpException('Reservation not found');
        }

        $reservation->setStatus($statusId);
        $reservation->setUpdateAt(new \DateTimeImmutable);

        $this->getEntityManager()->persist($reservation);
        $this->getEntityManager()->flush();

        return $reservation;
    }
}

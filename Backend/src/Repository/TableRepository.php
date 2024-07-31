<?php

namespace App\Repository;

use Doctrine\ORM\Tools\Pagination\Paginator as DoctrinePaginator;
use ApiPlatform\Doctrine\Orm\Paginator;
use App\Dto\TableDto;
use App\Entity\Table;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\Criteria;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Table>
 */
class TableRepository extends ServiceEntityRepository
{
    const ITEMS_PER_PAGE = 30;

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Table::class);
    }

    public function saveFromDto(TableDto $tableDto): Table
    {
        $table = new Table();

        $table->setName($tableDto->getName());
        $table->setCapacity($tableDto->getCapacity());
        $table->setMinRequiredCapacity($tableDto->getMinRequiredCapacity());
        $table->setAttendeeCount($tableDto->getAttendeeCount());

        $this->getEntityManager()->persist($table);
        $this->getEntityManager()->flush();

        return $table;
    }

    public function updateFromDto(TableDto $tableDto, int $id): Table
    {
        $table = $this->find($id);

        $table->setName($tableDto->getName());
        $table->setCapacity($tableDto->getCapacity());
        $table->setMinRequiredCapacity($tableDto->getMinRequiredCapacity());
        $table->setAttendeeCount($tableDto->getAttendeeCount());

        $this->getEntityManager()->persist($table);
        $this->getEntityManager()->flush();

        return $table;
    }

    public function findAllWithAvailability(string $date, string $time, int $page = 1): Paginator
    {
        $firstResult = ($page - 1) * self::ITEMS_PER_PAGE;

        $queryBuilder = $this->createQueryBuilder('t')
            ->select('t, r')
            ->leftJoin('t.reservations', 'r', 'WITH', 'r.table = t AND r.date = :date AND r.time = :time OR r.table IS NULL')
            ->setParameter('date', $date)
            ->setParameter('time', $time);

        $criteria = Criteria::create()
            ->setFirstResult($firstResult)
            ->setMaxResults(self::ITEMS_PER_PAGE);
        $queryBuilder->addCriteria($criteria);

        $doctrinePaginator = new DoctrinePaginator($queryBuilder);
        $paginator = new Paginator($doctrinePaginator);

        return $paginator;
    }

    public function getTableWithReservationsByDate(int $id, string $date): ?Table
    {
        return $this->createQueryBuilder('t')
        ->select('t, r')
        ->leftJoin('t.reservations', 'r', 'WITH', 'r.table = t AND r.date = :date')
        ->where('t.id = :tableId')
        ->setParameter('date', $date)
        ->setParameter('tableId', $id)
        ->getQuery()
        ->getOneOrNullResult();
    }
}

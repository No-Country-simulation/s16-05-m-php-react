<?php

namespace App\Repository;

use App\Dto\TableDto;
use App\Entity\Table;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Table>
 */
class TableRepository extends ServiceEntityRepository
{
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

        $this->getEntityManager()->persist($table);
        $this->getEntityManager()->flush();

        return $table;
    }
}

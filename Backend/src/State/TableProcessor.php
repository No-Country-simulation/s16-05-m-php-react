<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\Metadata\Put;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Table;
use App\Repository\TableRepository;

class TableProcessor implements ProcessorInterface
{
    public function __construct(
        private TableRepository $tableRepository
    ) {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): Table
    {
        if ($operation instanceof Put) {
            $table = $this->tableRepository->updateFromDto($data, $uriVariables['id']);
            return $table;
        }

        $table = $this->tableRepository->saveFromDto($data);
        return $table;
    }
}

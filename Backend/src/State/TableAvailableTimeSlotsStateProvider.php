<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\Table;
use App\Repository\TableRepository;
use Doctrine\ORM\AbstractQuery;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class TableAvailableTimeSlotsStateProvider implements ProviderInterface
{
    const TIMES = [
        '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
    ];

    public function __construct(
        private TableRepository $tableRepository,
        private RequestStack $requestStack
    ) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $date = $this->requestStack->getCurrentRequest()->query->get('date', date('Y-m-d'));
        $table = $this->tableRepository->getTableWithReservationsByDate($uriVariables['id'], $date);

        if (!$table) {
            throw new NotFoundHttpException(
                sprintf('Table with id "%s" not found', $uriVariables['id'])
            );
        }

        $inUseTimes = $this->getUsedTimes($table);
        $formattedTimes = $this->formatTimes(self::TIMES);

        return $this->resolveTimeStatus($formattedTimes, $inUseTimes); 
    }

    public function formatTimes(array $times): array 
    {
        return array_map(static function ($time) {
            $onlyHour = (int) str_replace(':00', '', $time);
            return [
                'time' => $time,
                'formatted' => $onlyHour . " a " . $onlyHour + 1 . " hrs"
            ];
        }, $times);
    }

    public function resolveTimeStatus(array $times, array $inUseTimes): array
    {
        return array_map(static function ($time) use ($inUseTimes) {
            $time['status'] = in_array($time['time'], $inUseTimes) ? 'reserved' : 'free';
            return $time;
        }, $times);
    }

    public function getUsedTimes(Table $table): array
    {
        $inUseTimes = [];
        $reservations = $table->getReservations()->toArray();

        foreach ($reservations as $reservation) {
            $inUseTimes[] = $reservation->getTime()->format('H:i');
        }

        return $inUseTimes;
    }
}

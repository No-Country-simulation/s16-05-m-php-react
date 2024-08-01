<?php

namespace App\State;

use ApiPlatform\Doctrine\Common\CollectionPaginator;
use ApiPlatform\Doctrine\Orm\Paginator;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Repository\TableRepository;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\RequestStack;

use function Symfony\Component\Clock\now;

class TableStateProvider implements ProviderInterface
{
    public function __construct(
        #[Autowire(service: 'api_platform.doctrine.orm.state.collection_provider')]
        private ProviderInterface $provider,
        private TableRepository $tableRepository,
        private RequestStack $requestStack
    ) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $request = $this->requestStack->getCurrentRequest();
        $date = $request->query->get('date', now()->format('Y-m-d'));
        $time = $request->query->get('time', now()->format('H:00')) . ':00';

        return $this->tableRepository->findAllWithAvailability($date, $time);
    }
}

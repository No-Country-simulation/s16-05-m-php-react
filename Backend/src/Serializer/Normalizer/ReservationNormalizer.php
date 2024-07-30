<?php

namespace App\Serializer\Normalizer;

use ApiPlatform\Metadata\Put;
use App\Entity\Reservation;
use App\Util\ReservationStatuses;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class ReservationNormalizer implements NormalizerInterface
{
    public function __construct(
        #[Autowire(service: 'api_platform.jsonld.normalizer.item')]
        private NormalizerInterface $normalizer
    ) {
    }

    public function normalize($object, ?string $format = null, array $context = []): array
    {
        $data = $this->normalizer->normalize($object, $format, $context);
        $data['status'] = ReservationStatuses::getById($object->getStatus());
        $data['@id'] = '/api/reservations/' . $object->getId();
        
        return $data;
    }

    public function supportsNormalization($data, ?string $format = null, array $context = []): bool
    {
        return $data instanceof Reservation;
    }

    public function getSupportedTypes(?string $format): array
    {
        return [Reservation::class => true];
    }
}

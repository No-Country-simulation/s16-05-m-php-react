<?php

namespace App\Serializer\Normalizer;

use App\Entity\Table;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class TableNormalizer implements NormalizerInterface
{
    public function __construct(
        #[Autowire(service: 'api_platform.jsonld.normalizer.item')]
        private NormalizerInterface $normalizer
    ) {
    }

    /**
     * @param Table $object
     */
    public function normalize($object, ?string $format = null, array $context = []): array
    {
        $data = $this->normalizer->normalize($object, $format, $context);
        $data['status'] = 'free';

        if ($object->getReservations()->count() > 0) {
            $data['status'] = 'reserved';
        }

        return $data;
    }

    public function supportsNormalization($data, ?string $format = null, array $context = []): bool
    {
        return $data instanceof Table;
    }

    public function getSupportedTypes(?string $format): array
    {
        return [Table::class => true];
    }
}

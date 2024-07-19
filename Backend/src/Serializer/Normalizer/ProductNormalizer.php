<?php

namespace App\Serializer\Normalizer;

use App\Entity\Product;
use ImageKit\ImageKit;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class ProductNormalizer implements NormalizerInterface
{
    public function __construct(
        #[Autowire(service: 'api_platform.jsonld.normalizer.item')]
        private NormalizerInterface $normalizer,
        private ImageKit $imageKit
    ) {
    }

    /**
     * @param Product $object
     */
    public function normalize($object, ?string $format = null, array $context = []): array
    {
        $data = $this->normalizer->normalize($object, $format, $context);
        $data['image'] = null;
        
        if (is_array($data) && null != $object->getImagePath()) {
            $data['image'] = $_ENV['IMAGE_KIT_URL_ENDPOINT'] . $object->getImagePath();
        }

        return $data;
    }

    public function supportsNormalization($data, ?string $format = null, array $context = []): bool
    {
        return $data instanceof Product;
    }

    public function getSupportedTypes(?string $format): array
    {
        return [Product::class => true];
    }
}

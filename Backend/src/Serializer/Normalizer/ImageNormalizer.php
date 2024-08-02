<?php

namespace App\Serializer\Normalizer;

use App\Entity\Category;
use App\Entity\Product;
use ImageKit\ImageKit;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class ImageNormalizer implements NormalizerInterface
{
    public function __construct(
        #[Autowire(service: 'api_platform.jsonld.normalizer.item')]
        private NormalizerInterface $normalizer,
        private ImageKit $imageKit
    ) {
    }

    /**
     * @param Category | Product $object
     */
    public function normalize($object, ?string $format = null, array $context = []): array
    {
        $data = $this->normalizer->normalize($object, $format, $context);
        $data['image'] = null;
        
        if (is_array($data) && null != $object->getImagePath()) {
            $data['image'] = $_ENV['IMAGE_KIT_URL_ENDPOINT'] . $object->getImagePath() . "?updated=" . $object->getUpdatedAt()->getTimestamp();
        }

        return $data;
    }

    public function supportsNormalization($data, ?string $format = null, array $context = []): bool
    {
        return $data instanceof Product || $data instanceof Category && method_exists($data, 'getUpdatedAt');
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            Product::class => true,
            Category::class => true,
        ];
    }
}

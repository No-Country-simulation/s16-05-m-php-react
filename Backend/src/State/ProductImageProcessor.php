<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Dto\ProductImageDto;
use App\Entity\Product;
use App\Service\ProductService;

class ProductImageProcessor implements ProcessorInterface
{

    public function __construct(
        private ProductService $productService
    ) {}

    /**
     * @param ProductImageDto $data
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): Product
    {
        return $this->productService->uploadImage($uriVariables['id'], $data->getImage());
    }
}

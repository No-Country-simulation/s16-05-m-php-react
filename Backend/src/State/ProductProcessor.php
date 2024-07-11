<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\Metadata\Put;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Product;
use App\Repository\ProductRepository;

class ProductProcessor implements ProcessorInterface
{
    public function __construct(
        private ProductRepository $productRepository
    ) {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): Product
    {
        if ($operation instanceof Put) {
            $product = $this->productRepository->updateFromDto($data, $uriVariables['id']);
            return $product;
        }

        $product = $this->productRepository->saveFromDto($data);
        return $product;
    }
}

<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Dto\ProductImageDto;
use App\Entity\Category;
use App\Service\CategoryService;

class CategoryImageProcessor implements ProcessorInterface
{
    public function __construct(
        private CategoryService $categoryService
    ) {}

    /**
     * @param ProductImageDto $data
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): Category
    {
        return $this->categoryService->uploadImage($uriVariables['id'], $data->getImage());
    }
}

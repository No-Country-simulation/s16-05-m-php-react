<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\Metadata\Put;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Category;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;

class CategoryStateProcessor implements ProcessorInterface
{
    public function __construct(
        private CategoryRepository $categoryRepository,
        private EntityManagerInterface $em
    ) {}

    /**
     * @param Category $data
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): Category
    {
        if ($operation instanceof Put) {
            $category = $this->categoryRepository->find($uriVariables['id']);

            $category->setName($data->getName());
            $category->setPhrase($data->getPhrase());
            $category->setUpdatedAt(new \DateTimeImmutable());

            $this->em->persist($category);
            $this->em->flush();

            return $category;
        }

        $this->em->persist($data);
        $this->em->flush();

        return $data;
    }
}

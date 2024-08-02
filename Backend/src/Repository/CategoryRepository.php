<?php

namespace App\Repository;

use App\Entity\Category;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Category>
 */
class CategoryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Category::class);
    }

    public function updateImage(int $id, string $imageName, string $imagePath): ?Category
    {
        /** @var Category $category */
        $category = $this->find($id);

        $category->setImageName($imageName);
        $category->setImagePath($imagePath);
        $category->setUpdatedAt(new \DateTimeImmutable());

        $this->getEntityManager()->persist($category);
        $this->getEntityManager()->flush();

        return $category;
    }
}

<?php

namespace App\Repository;

use App\Dto\ProductDto;
use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Product>
 */
class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }

    public function saveFromDto(ProductDto $productDto): Product
    {
        $product = new Product();
        
        $product->setName($productDto->getName());
        $product->setPrice($productDto->getPrice());
        $product->setIsAvailable($productDto->getIsAvailable());

        $this->getEntityManager()->persist($product);
        $this->getEntityManager()->flush();

        return $product;
    }

    public function updateFromDto(ProductDto $productDto, int $id): Product
    {
        $product = $this->find($id);

        $product->setName($productDto->getName());
        $product->setPrice($productDto->getPrice());
        $product->setIsAvailable($productDto->getIsAvailable());

        $this->getEntityManager()->persist($product);
        $this->getEntityManager()->flush();

        return $product;
    }

    public function updateImage(int $id, string $imageName, string $imagePath): Product
    {
        /** @var Product $product */
        $product = $this->find($id);

        $product->setImageName($imageName);
        $product->setImagePath($imagePath);

        $this->getEntityManager()->persist($product);
        $this->getEntityManager()->flush();

        return $product;
    }
}

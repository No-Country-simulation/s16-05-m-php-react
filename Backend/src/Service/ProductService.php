<?php

namespace App\Service;

use App\Entity\Product;
use App\Repository\ProductRepository;
use ImageKit\ImageKit;
use ImageKit\Utils\Response as ImageKitResponse;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Mailer\Exception\UnexpectedResponseException;

class ProductService
{

    public function __construct(
        private ImageKit $imageKit,
        private ProductRepository $productRepository
    ) {}

    public function uploadImage(int $id, UploadedFile $uploadedFile): Product
    {
        /** @var Product $product */
        $product = $this->productRepository->find($id);
        
        if (!$product) {
            throw new NotFoundHttpException();
        }

        if (null == $product->getImageName()) {
            $product->setImageName($this->resolveProductImageName($product, $uploadedFile));
        }
        
        /** @var ImageKitResponse $response */
        $response = $this->imageKit->upload([
            "file" => base64_encode($uploadedFile->getContent()),
            "fileName" => $product->getImageName(),
            "useUniqueFileName" => false,
            "overwriteFile" => true,
        ]); 
        
        if ($response->error) {
            throw new UnexpectedResponseException("Error de servidor al subir la imagén", 500);
        }

        $product = $this->productRepository->updateImage($id, $product->getImageName(), $response->result->filePath);

        return $product;
    }

    private function resolveProductImageName(Product $product, UploadedFile $image): string
    {
        return $product->getName() . '_' . uniqid() . '.' . $image->guessExtension();
    }
}

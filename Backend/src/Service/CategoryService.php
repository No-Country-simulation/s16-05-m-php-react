<?php

namespace App\Service;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use ImageKit\ImageKit;
use ImageKit\Utils\Response as ImageKitResponse;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Mailer\Exception\UnexpectedResponseException;

class CategoryService
{

    public function __construct(
        private ImageKit $imageKit,
        private CategoryRepository $categoryRepository
    ) {}

    public function uploadImage(int $id, UploadedFile $uploadedFile): Category
    {
        /** @var Category $category */
        $category = $this->categoryRepository->find($id);
        
        if (!$category) {
            throw new NotFoundHttpException();
        }

        if (null == $category->getImageName()) {
            $category->setImageName($this->resolveCategoryImageName($category, $uploadedFile));
        }
        
        /** @var ImageKitResponse $response */
        $response = $this->imageKit->upload([
            "file" => base64_encode($uploadedFile->getContent()),
            "fileName" => $category->getImageName(),
            "useUniqueFileName" => false,
            "overwriteFile" => true,
        ]); 
        
        if ($response->error) {
            throw new UnexpectedResponseException("Error de servidor al subir la imagén", 500);
        }

        $category = $this->categoryRepository->updateImage($id, $category->getImageName(), $response->result->filePath);

        return $category;
    }

    private function resolveCategoryImageName(Category $category, UploadedFile $image): string
    {
        return $category->getName() . '_' . uniqid() . '.' . $image->guessExtension();
    }
}

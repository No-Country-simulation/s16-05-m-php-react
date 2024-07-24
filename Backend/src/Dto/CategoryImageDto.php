<?php

namespace App\Dto;

use ApiPlatform\Metadata\ApiProperty;
use Symfony\Component\Validator\Constraints as Assert;

class CategoryImageDto
{   
    #[ApiProperty(
        openapiContext: [
            'type' => 'string',
            'format' => 'binary'
        ]
    )]
    #[Assert\NotBlank]
    #[Assert\File(mimeTypes: ['image/*'], maxSize: '2048k')]
    private $image = null;

    public function getImage()
    {
        return $this->image;
    }

    public function setImage($image)
    {
        $this->image = $image;

        return $this;
    }
}

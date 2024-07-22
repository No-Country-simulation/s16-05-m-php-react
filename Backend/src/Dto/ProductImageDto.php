<?php

namespace App\Dto;

use ApiPlatform\Metadata\ApiProperty;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;

class ProductImageDto
{   
    #[ApiProperty(
        openapiContext: [
            'type' => 'string',
            'format' => 'binary'
        ]
    )]
    #[Assert\NotBlank(groups: ['product-image:validation'])]
    #[Assert\File(mimeTypes: ['image/*'], maxSize: '2048k', groups: ['product-image:validation'])]
    #[Groups(['product-image:write'])]
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

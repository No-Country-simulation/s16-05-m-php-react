<?php

namespace App\Dto;

use ApiPlatform\Metadata\ApiProperty;
use App\Util\ReservationStatuses;
use Symfony\Component\Validator\Constraints as Assert;

use function PHPSTORM_META\map;

class ReservationStatusDto
{
    #[Assert\NotBlank()]
    #[Assert\Choice(choices: ReservationStatuses::ALL)]
    #[ApiProperty(
        openapiContext: [
            'type' => 'string',
            'description' => 'Estado de la reservación',
            'enum' => ['in-progress', 'canceled', 'completed', 'pending', 'no-show', 'scheduled'],
            'example' => 'in-progress'
        ]
    )]
    private $status;

    public function getStatus()
    {
        return $this->status;
    }

    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }
}

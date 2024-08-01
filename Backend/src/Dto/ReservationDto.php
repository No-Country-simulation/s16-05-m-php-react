<?php

namespace App\Dto;

use ApiPlatform\Metadata\ApiProperty;
use App\Entity\Table;
use App\Validator\ReservationDate;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints\DateTime;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\GreaterThan;
use Symfony\Component\Validator\Constraints\GreaterThanOrEqual;
use Symfony\Component\Validator\Constraints\LessThanOrEqual;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Type;

#[ReservationDate(groups: ['reservation:write:validation'])]
class ReservationDto
{
    #[ApiProperty(
        openapiContext: [
            'type' => 'string',
            'example' => '2024-12-31',
            'description' => 'Fecha en la que se hará la reserva',
        ]
    )]
    #[NotBlank(groups: ['reservation:write:validation'])]
    #[DateTime(groups: ['reservation:write:validation'], format: 'Y-m-d')]
    #[Groups(['reservation:write'])]
    private $date;

    #[ApiProperty(
        openapiContext: [
            'type' => 'string',
            'example' => '00:00',
            'description' => 'Hora de la reserva',
        ]
    )]
    #[NotBlank(groups: ['reservation:write:validation'])]
    #[DateTime(groups: ['reservation:write:validation'], format: 'H:00')]
    #[Groups(['reservation:write'])]
    private $time;

    #[Groups(['reservation:read'])]
    private $code;

    #[Groups(['reservation:read'])]
    private $status;

    #[ApiProperty(
        openapiContext: [
            'type' => 'string',
            'example' => 'Juan',
            'description' => 'El nombre del cliente que hará la reserva',
        ]
    )]
    #[NotBlank(groups: ['reservation:write:validation'])]
    #[Groups(['reservation:write'])]
    private $owner_first_name;

    #[ApiProperty(
        openapiContext: [
            'type' => 'string',
            'example' => 'Joe',
            'description' => 'El apellido del cliente que hará la reserva',
        ]
    )]
    #[NotBlank(groups: ['reservation:write:validation'])]
    #[Groups(['reservation:write'])]
    private $owner_last_name;

    #[ApiProperty(
        openapiContext: [
            'type' => 'string',
            'example' => '+57-123456789',
            'description' => 'Numero de quien reserva la mesa',
        ]
    )]
    #[NotBlank(groups: ['reservation:write:validation'])]
    #[Groups(['reservation:write'])]
    private $owner_phone_number;

    #[ApiProperty(
        openapiContext: [
            'type' => 'string',
            'example' => 'example@ex.com',
            'description' => 'correo electrónico del cliente que hará la reserva',
        ]
    )]
    #[NotBlank(groups: ['reservation:write:validation'])]
    #[Email(groups: ['reservation:write:validation'])]
    #[Groups(['reservation:write'])]
    private $owner_email;

    #[ApiProperty(
        openapiContext: [
            'example' => '/api/tables/1',
            'description' => 'URI de la mesa en la que se hará la reserva',
        ]
    )]
    #[NotBlank(groups: ['reservation:write:validation'])]
    #[Groups(['reservation:write'])]
    private ?Table $table;

    #[NotBlank(groups: ['reservation:write:validation'])]
    #[Type(type: 'integer', groups: ['reservation:write:validation'])]
    #[GreaterThan(0, groups: ['reservation:write:validation'])]
    #[GreaterThanOrEqual(
        message: 'reservation.attendee_count.greater_than_or_equal',
        propertyPath: 'table.min_required_capacity',
        groups: ['reservation:write:validation'],
    )]
    #[LessThanOrEqual(
        message: 'reservation.attendee_count.less_than_or_equal',
        propertyPath: 'table.capacity',
        groups: ['reservation:write:validation'],
    )]
    #[Groups(['reservation:write'])]
    private int $attendee_count;

    public function getDate()
    {
        return \DateTimeImmutable::createFromFormat('Y-m-d', $this->date);
    }

    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    public function getTime()
    {
        return  \DateTimeImmutable::createFromFormat('H:i', $this->time);
    }

    public function setTime($time)
    {
        $this->time = $time;

        return $this;
    }

    public function getCode()
    {
        return $this->code;
    }

    public function setCode($code)
    {
        $this->code = $code;

        return $this;
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    public function getOwnerFirstName()
    {
        return $this->owner_first_name;
    }

    public function setOwnerFirstName($owner_first_name)
    {
        $this->owner_first_name = $owner_first_name;

        return $this;
    }

    public function getOwnerLastName()
    {
        return $this->owner_last_name;
    }

    public function setOwnerLastName($owner_last_name)
    {
        $this->owner_last_name = $owner_last_name;

        return $this;
    }

    public function getOwnerPhoneNumber()
    {
        return $this->owner_phone_number;
    }

    public function setOwnerPhoneNumber($owner_phone_number)
    {
        $this->owner_phone_number = $owner_phone_number;

        return $this;
    }

    public function getOwnerEmail()
    {
        return $this->owner_email;
    }

    public function setOwnerEmail($owner_email)
    {
        $this->owner_email = $owner_email;

        return $this;
    }

    public function getTable(): ?Table
    {
        return $this->table;
    }

    public function setTable(?Table $table)
    {
        $this->table = $table;

        return $this;
    }

    public function getAttendeeCount()
    {
        return $this->attendee_count;
    }

    public function setAttendeeCount($attendee_count)
    {
        $this->attendee_count = $attendee_count;

        return $this;
    }
}
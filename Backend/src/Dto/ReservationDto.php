<?php

namespace App\Dto;

use App\Entity\Reservation;
use App\Entity\Table;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints\DateTime;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

#[UniqueEntity(fields: ['code'], entityClass: Reservation::class, groups: ['reservation:write:validation'])]
class ReservationDto
{
    #[Groups(['reservation:read'])]
    private $id;

    #[NotBlank(groups: ['reservation:write:validation'])]
    #[DateTime(groups: ['reservation:write:validation'])]
    #[Groups(['reservation:write'])]
    private $date_from;

    #[NotBlank(groups: ['reservation:write:validation'])]
    #[DateTime(groups: ['reservation:write:validation'])]
    #[Groups(['reservation:write'])]
    private $date_to;

    #[Groups(['reservation:read'])]
    private $code;

    #[NotBlank(groups: ['reservation:write:validation'])]
    #[Groups(['reservation:write'])]
    private $status;

    #[NotBlank(groups: ['reservation:write:validation'])]
    #[Groups(['reservation:write'])]
    private $owner_first_name;

    #[NotBlank(groups: ['reservation:write:validation'])]
    #[Groups(['reservation:write'])]
    private $owner_last_name;

    #[NotBlank(groups: ['reservation:write:validation'])]
    #[Groups(['reservation:write'])]
    private $owner_phone_number;

    #[NotBlank(groups: ['reservation:write:validation'])]
    #[Email(groups: ['reservation:write:validation'])]
    #[Groups(['reservation:write'])]
    private $owner_email;

    #[Groups(['reservation:write'])]
    private $created_at;

    #[Groups(['reservation:write'])]
    private $update_at;

    #[NotBlank(groups: ['reservation:write:validation'])]
    #[Groups(['reservation:write'])]
    private ?Table $_table;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateFrom()
    {
        return new \DateTimeImmutable($this->date_from);
    }

    public function setDateFrom($date_from)
    {
        $this->date_from = $date_from;

        return $this;
    }

    public function getDateTo()
    {
        return new \DateTimeImmutable($this->date_to);
    }

    public function setDateTo($date_to)
    {
        $this->date_to = $date_to;

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

    public function getCreatedAt()
    {
        return new \DateTimeImmutable();
    }

    public function setCreatedAt($created_at)
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdateAt()
    {
        return new \DateTimeImmutable();
    }

    public function setUpdateAt($update_at)
    {
        $this->update_at = $update_at;

        return $this;
    }

    public function getTable(): ?Table
    {
        return $this->_table;
    }

    public function setTable(?Table $_table)
    {
        $this->_table = $_table;

        return $this;
    }
}
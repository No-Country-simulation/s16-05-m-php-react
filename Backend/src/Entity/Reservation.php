<?php

namespace App\Entity;

use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\ReservationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Dto\ReservationDto;
use App\State\ReservationProcessor;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Entity\Table;

#[GetCollection(
    normalizationContext: ['groups' => ['reservation:read']],
)]
#[Post(
    denormalizationContext: ['groups' => ['reservation:write']],
    normalizationContext: ['groups' => ['reservation:read']],
    validationContext: ['groups' => ['reservation:write:validation']],
    input: ReservationDto::class,
    processor: ReservationProcessor::class,
)]
#[Delete()]
#[Put(
    denormalizationContext: ['groups' => ['reservation:write']],
    normalizationContext: ['groups' => ['reservation:read']],
    validationContext: ['groups' => ['reservation:write:validation']],
    input: ReservationDto::class,
    processor: ReservationProcessor::class
)]
#[ORM\Entity(repositoryClass: ReservationRepository::class)]
class Reservation
{

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['reservation:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['reservation:read'])]
    private ?\DateTimeImmutable $date_from = null;

    #[ORM\Column]
    #[Groups(['reservation:read'])]
    private ?\DateTimeImmutable $date_to = null;

    #[ORM\Column(length: 7)]
    #[Groups(['reservation:read'])]
    private ?string $code;

    #[ORM\Column(length: 255)]
    #[Groups(['reservation:read'])]
    private ?string $status = null;

    #[ORM\Column(length: 255)]
    #[Groups(['reservation:read'])]
    private ?string $owner_first_name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['reservation:read'])]
    private ?string $owner_last_name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['reservation:read'])]
    private ?string $owner_phone_number = null;

    #[ORM\Column(length: 255)]
    #[Groups(['reservation:read'])]
    private ?string $owner_email = null;

    #[ORM\Column]
    #[Groups(['reservation:read'])]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column]
    #[Groups(['reservation:read'])]
    private ?\DateTimeImmutable $update_at = null;

    /**
     * @var Collection<int, Order>
     */
    #[ORM\OneToMany(targetEntity: Order::class, mappedBy: 'reservation', orphanRemoval: true)]
    private Collection $orders;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    #[ORM\JoinColumn(nullable: false, name: '_table_id')]
    #[Groups(['reservation:read'])]
    private ?Table $table = null;

    public function __construct()
    {
        $this->orders = new ArrayCollection();
        $this->status = 'waiting';
        $this->created_at = new \DateTimeImmutable();
        $this->update_at = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateFrom(): ?\DateTimeImmutable
    {
        return $this->date_from;
    }

    public function setDateFrom(\DateTimeImmutable $date_from): static
    {
        $this->date_from = $date_from;

        return $this;
    }

    public function getDateTo(): ?\DateTimeImmutable
    {
        return $this->date_to;
    }

    public function setDateTo(\DateTimeImmutable $date_to): static
    {
        $this->date_to = $date_to;

        return $this;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = $code;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getOwnerFirstName(): ?string
    {
        return $this->owner_first_name;
    }

    public function setOwnerFirstName(string $owner_first_name): static
    {
        $this->owner_first_name = $owner_first_name;

        return $this;
    }

    public function getOwnerLastName(): ?string
    {
        return $this->owner_last_name;
    }

    public function setOwnerLastName(string $owner_last_name): static
    {
        $this->owner_last_name = $owner_last_name;

        return $this;
    }

    public function getOwnerPhoneNumber(): ?string
    {
        return $this->owner_phone_number;
    }

    public function setOwnerPhoneNumber(string $owner_phone_number): static
    {
        $this->owner_phone_number = $owner_phone_number;

        return $this;
    }

    public function getOwnerEmail(): ?string
    {
        return $this->owner_email;
    }

    public function setOwnerEmail(string $owner_email): static
    {
        $this->owner_email = $owner_email;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdateAt(): ?\DateTimeImmutable
    {
        return $this->update_at;
    }

    public function setUpdateAt(\DateTimeImmutable $update_at): static
    {
        $this->update_at = $update_at;

        return $this;
    }

    /**
     * @return Collection<int, Order>
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): static
    {
        if (!$this->orders->contains($order)) {
            $this->orders->add($order);
            $order->setReservation($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): static
    {
        if ($this->orders->removeElement($order)) {
            if ($order->getReservation() === $this) {
                $order->setReservation(null);
            }
        }

        return $this;
    }

    public function getTable(): ?Table
    {
        return $this->table;
    }

    public function setTable(?Table $table): static
    {
        $this->table = $table;

        return $this;
    }
}

<?php

namespace App\Entity;

use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\OpenApi\Model\Operation;
use App\Repository\ReservationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Dto\ReservationDto;
use App\Dto\ReservationStatusDto;
use App\State\ReservationProcessor;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Entity\Table;
use App\State\ReservationStatusProcessor;
use App\Util\ReservationStatuses;
use Symfony\Component\Serializer\Attribute\Context;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;

#[Get(
    normalizationContext: ['groups' => ['reservation:read']],
    uriTemplate: '/reservations/{code}',
    uriVariables: [
        'code' => new Link(identifiers: ['code'])],
    openapi: new Operation(
        summary: 'Get reservation by code',
        description: 'Get reservation by code'
    )
)]
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
#[Delete(
    security: 'is_granted("ROLE_ADMIN")',
)]
#[Put(
    denormalizationContext: ['groups' => ['reservation:write']],
    normalizationContext: ['groups' => ['reservation:read']],
    validationContext: ['groups' => ['reservation:write:validation']],
    input: ReservationDto::class,
    processor: ReservationProcessor::class
)]
#[Put(
    normalizationContext: ['groups' => ['reservation:read']],
    uriTemplate: '/reservations/{id}/status',
    requirements: ['id' => '\d+'],
    processor: ReservationStatusProcessor::class,
    input: ReservationStatusDto::class,
    security: 'is_granted("ROLE_ADMIN")',
    openapi: new Operation(
        summary: 'Update reservation status',
        description: "Cambiar el estado de una reserva
## Estados disponibles:
- `in-progress`: Indica que la reserva está en curso, probablemente el cliente está en el restaurante.\n
- `canceled`: Indica que la reserva ha sido cancelada.
- `completed`: Indica que la reserva ha sido completada con éxito.
- `pending`: Indica que la reserva ha sido creada pero aún no ha sido confirmada o atendida.
- `no-show`: Para indicar que el cliente no se presentó a la reserva.
- `scheduled`: La reserva está confirmada y a la espera de la fecha y hora acordadas.
      "
    )
)]
#[ORM\Entity(repositoryClass: ReservationRepository::class)]
class Reservation
{

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['reservation:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 7)]
    #[Groups(['reservation:read'])]
    private ?string $code;

    #[ORM\Column(length: 255)]
    #[Groups(['reservation:read', Types::INTEGER])]
    private ?int $status = null;

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
    #[Context([DateTimeNormalizer::FORMAT_KEY => 'Y-m-d'])]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column]
    #[Groups(['reservation:read'])]
    #[Context([DateTimeNormalizer::FORMAT_KEY => 'Y-m-d'])]
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
    
    #[ORM\Column(type: Types::DATE_IMMUTABLE)]
    #[Groups(['reservation:read'])]
    #[Context([DateTimeNormalizer::FORMAT_KEY => 'Y-m-d'])]
    private ?\DateTimeImmutable $date = null;
    
    #[ORM\Column(type: Types::TIME_IMMUTABLE)]
    #[Groups(['reservation:read'])]
    #[Context([DateTimeNormalizer::FORMAT_KEY => 'H:i'])]
    private ?\DateTimeImmutable $time = null;

    public function __construct()
    {
        $this->orders = new ArrayCollection();
        $this->status = ReservationStatuses::IN_PROGRESS;
        $this->created_at = new \DateTimeImmutable();
        $this->update_at = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status): static
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

    public function getDate(): ?\DateTimeImmutable
    {
        return $this->date;
    }

    public function setDate(\DateTimeImmutable $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getTime(): ?\DateTimeImmutable
    {
        return $this->time;
    }

    public function setTime(\DateTimeImmutable $time): static
    {
        $this->time = $time;

        return $this;
    }
}

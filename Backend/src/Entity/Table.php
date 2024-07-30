<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\OpenApi\Model\Operation;
use ApiPlatform\OpenApi\Model\Parameter;
use ApiPlatform\OpenApi\Model\Response;
use App\Dto\TableAvailableTimeSlotsDto;
use App\Dto\TableDto;
use App\Repository\TableRepository;
use App\State\TableAvailableTimeSlotsStateProvider;
use App\State\TableProcessor;
use App\State\TableStateProvider;
use ArrayObject;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[GetCollection(
    uriTemplate: '/tables/{id}/available-time-slots',
    requirements: ['id' => '\d+'],
    provider: TableAvailableTimeSlotsStateProvider::class,
    output: TableAvailableTimeSlotsDto::class,
    openapi: new Operation(
        summary: 'Obtiene los horarios disponibles de una mesa',
        description: 'Obtiene los horarios disponibles de una mesa en base a una fecha dada.',
        parameters: [
            new Parameter('date', 'query', 'Fecha en formato YYYY-MM-DD', example: '2024-01-01')
        ],
    )
)]
#[GetCollection(
    normalizationContext: ['groups' => ['table:read']],
    provider: TableStateProvider::class
)]
#[Post(
    security: 'is_granted("ROLE_ADMIN")',
    denormalizationContext: ['groups' => ['table:write']],
    normalizationContext: ['groups' => ['table:read']],
    validationContext: ['groups' => ['table:write:validation']],
    input: TableDto::class,
    processor: TableProcessor::class,
    // openapi: new Operation(
    //     summary: 'Ejemplo de sumario',
    //     description: 'Ejemplo de descripción!!!'
    // )
)]
#[Delete(
    security: 'is_granted("ROLE_ADMIN")',
)]
#[Put(
    security: 'is_granted("ROLE_ADMIN")',
    denormalizationContext: ['groups' => ['table:write']],
    normalizationContext: ['groups' => ['table:read']],
    input: TableDto::class,
    processor: TableProcessor::class,
    validationContext: ['groups' => ['table:write:validation']],
)]
#[ORM\Entity(repositoryClass: TableRepository::class)]
#[ORM\Table(name: '`table`')]
class Table
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['table:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['table:read'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['table:read'])]
    private ?int $capacity = null;

    #[ORM\Column]
    #[Groups(['table:read'])]
    private ?int $min_required_capacity = null;

    /**
     * @var Collection<int, Reservation>
     */
    #[ORM\OneToMany(targetEntity: Reservation::class, mappedBy: 'table')]
    private Collection $reservations;

    public function __construct()
    {
        $this->reservations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getCapacity(): ?int
    {
        return $this->capacity;
    }

    public function setCapacity(int $capacity): static
    {
        $this->capacity = $capacity;

        return $this;
    }

    public function getMinRequiredCapacity(): ?int
    {
        return $this->min_required_capacity;
    }

    public function setMinRequiredCapacity(int $min_required_capacity): static
    {
        $this->min_required_capacity = $min_required_capacity;

        return $this;
    }

    /**
     * @return Collection<int, Reservation>
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservation $reservation): static
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations->add($reservation);
            $reservation->setTable($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): static
    {
        if ($this->reservations->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getTable() === $this) {
                $reservation->setTable(null);
            }
        }

        return $this;
    }
}

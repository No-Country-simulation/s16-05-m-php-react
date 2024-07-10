<?php

namespace App\Entity;

use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Dto\TableDto;
use App\Repository\TableRepository;
use App\State\TableProcessor;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[GetCollection(
    normalizationContext: ['groups' => ['table:read']],
)]
#[Post(
    denormalizationContext: ['groups' => ['table:write']],
    normalizationContext: ['groups' => ['table:read']],
    validationContext: ['groups' => ['table:write:validation']],
    input: TableDto::class,
    processor: TableProcessor::class
)]
#[Delete()]
#[Put(
    denormalizationContext: ['groups' => ['table:write']],
    normalizationContext: ['groups' => ['table:read']],
    input: TableDto::class,
    processor: TableProcessor::class
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
    private ?int $available_sits = null;

    /**
     * @var Collection<int, Reservation>
     */
    #[ORM\OneToMany(targetEntity: Reservation::class, mappedBy: '_table')]
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

    public function getAvailableSits(): ?int
    {
        return $this->available_sits;
    }

    public function setAvailableSits(int $available_sits): static
    {
        $this->available_sits = $available_sits;

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

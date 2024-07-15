<?php

namespace App\Validator;

use App\Dto\ReservationDto;
use App\Repository\ReservationRepository;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class ReservationDateValidator extends ConstraintValidator
{
    public function __construct(
        private ReservationRepository $reservationRepository
    ) {}

    /**
     * @param ReservationDto $value
     */
    public function validate(mixed $receipt, Constraint $constraint): void
    {
        /* @var ReservationDate $constraint */

        if (null === $receipt || '' === $receipt) {
            return;
        }

        if (!$receipt instanceof ReservationDto) {
            return;
        }

        $dateFrom = $receipt->getDateFrom();
        $dateTo = $receipt->getDateTo();

        if ($this->reservationRepository->existReservationByDateRange($dateFrom, $dateTo)) {
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ dateFrom }}', $dateFrom->format('H:i'))
                ->setParameter('{{ dateTo }}', $dateTo->format('H:i'))
                ->addViolation();
        }
    }
}

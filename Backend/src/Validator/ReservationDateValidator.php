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

        $date = $receipt->getDate();
        $time = $receipt->getTime();

        if ($this->reservationRepository->existReservationByDateAndTime($date, $time, $receipt->getTable()->getId())) {
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ date }}', $date->format('Y-m-d'))
                ->setParameter('{{ time }}', $time->format('H:i'))
                ->addViolation();
        }
    }
}

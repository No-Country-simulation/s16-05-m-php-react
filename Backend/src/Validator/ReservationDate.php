<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 * @Target()
 */
#[\Attribute]
class ReservationDate extends Constraint
{
    /*
     * Any public properties become valid options for the annotation.
     * Then, use these in your validator class.
     */
    public string $message = 'Ya existe una reservación para el {{ date }} a las {{ time }}.';

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}

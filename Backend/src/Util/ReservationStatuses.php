<?php

namespace App\Util;

use Symfony\Component\HttpFoundation\Exception\BadRequestException;

/**
 *  - in progress: Indica que la reserva está en curso, probablemente el cliente está en el restaurante.
 *  - canceled: Indica que la reserva ha sido cancelada.
 *  - completed: Indica que la reserva ha sido completada con éxito.
 *  - pending: Indica que la reserva ha sido creada pero aún no ha sido confirmada o atendida.
 *  - no-show: Para indicar que el cliente no se presentó a la reserva.
 *  - scheduled: La reserva está confirmada y a la espera de la fecha y hora acordadas.
 */
class ReservationStatuses
{
    public const IN_PROGRESS = 1;
    public const CANCELED = 2;
    public const COMPLETED = 3;
    public const PENDING = 4;
    public const NO_SHOW = 5;
    public const SCHEDULED = 6;

    public const ALL = [
        self::IN_PROGRESS => 'in-progress',
        self::CANCELED => 'canceled',
        self::COMPLETED => 'completed',
        self::PENDING => 'pending',
        self::NO_SHOW => 'no-show',
        self::SCHEDULED => 'scheduled',
    ];

    public static function getById(int $id): string
    {
        if (!isset(self::ALL[$id])) {
            throw new BadRequestException('Invalid reservation status id');
        }

        return self::ALL[$id];
    }

    public static function getIdByName(string $name): string
    {
        if (!in_array($name, self::ALL)) {
            throw new BadRequestException('Invalid reservation status name');
        }

        return array_search($name, self::ALL);
    }
}

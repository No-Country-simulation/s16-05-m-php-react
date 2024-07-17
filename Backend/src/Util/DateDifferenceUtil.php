<?php

namespace App\Util;

use DateTimeInterface;

class DateDifferenceUtil
{
    public static function getDifferenceInMinutes(DateTimeInterface $date1, DateTimeInterface $date2): int
    {
        $diff = $date1->diff($date2);
        $diffInMinutes = $diff->days * 24 * 60 + $diff->h * 60 + $diff->i;

        return $diffInMinutes;
    }

    public static function getDifferenceInHours(DateTimeInterface $date1, DateTimeInterface $date2): int
    {
        $diff = $date1->diff($date2);
        $diffInHours = $diff->days * 24 + $diff->h;

        return $diffInHours;
    }
}

<?php

namespace App\Dto;

class TableAvailableTimeSlotsDto 
{
    private string $time;
    private string $formatted;


    /**
     * Get the value of time
     */ 
    public function getTime()
    {
        return $this->time;
    }

    /**
     * Set the value of time
     *
     * @return  self
     */ 
    public function setTime($time)
    {
        $this->time = $time;

        return $this;
    }

    /**
     * Get the value of formatted
     */ 
    public function getFormatted()
    {
        return $this->formatted;
    }

    /**
     * Set the value of formatted
     *
     * @return  self
     */ 
    public function setFormatted($formatted)
    {
        $this->formatted = $formatted;

        return $this;
    }
}
<?php

use App\Repository\ReservationRepository;

class ReservationService{

    function __construct(
        private ReservationRepository $reservationRepository
    ){}

    static public function generateCode(){
        $letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        $numbers = ['0','1','2','3','4','5','6','7','8','9'];
        $code = [];
        for ($i = 0; $i < 3; $i++) {
            $code[] = $letters[rand(0, count($letters) - 1)];
        }
        for ($i = 0; $i < 3; $i++) {
            $code[] = $numbers[rand(0, count($numbers) - 1)];
        }
        shuffle($code);
        $code = implode('', $code);
        return $code;
    }

    public function code()
    {
        do{
            $code = static::generateCode();
            $codeVerification = $this->reservationRepository->findOneBy(['code' => $code]);
        } while ($codeVerification);
        
        return $code;
    } 
}

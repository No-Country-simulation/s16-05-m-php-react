<?php

namespace App\Controller;

use App\Util\StaticRestaurantInfo;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class RestaurantInfoController extends AbstractController
{
    public function __invoke(): JsonResponse
    {
        return $this->json([
            'name' => StaticRestaurantInfo::NAME,
        ]);
    }
}

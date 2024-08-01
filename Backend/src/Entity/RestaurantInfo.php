<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\OpenApi\Model\Operation;
use ApiPlatform\OpenApi\Model\Response;
use App\Controller\RestaurantInfoController;

#[Get(
    shortName: 'Restaurant information',
    uriTemplate: '/restaurant-info',
    controller: RestaurantInfoController::class,
    read: false,
    status: 200,
    openapi: new Operation(
        summary: 'Get restaurant info',
        description: 'Información sobre el restaurante.',
        responses: [
            '200' => new Response(
                description: 'Información sobre el restaurante',
                content: new \ArrayObject([
                    'application/ld+json' => [
                        'schema' => [
                            'type' => 'object',
                            'properties' => [
                                'name' => [
                                    'type' => 'string',
                                    'example' => 'McDonalds'
                                ]
                            ]
                        ]
                    ]
                ])
            )
        ]
    )
)]
class RestaurantInfo {}

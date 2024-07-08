<?php

namespace App\Util;

use Symfony\Component\HttpFoundation\JsonResponse;

class SuccessMessageResponse extends JsonResponse
{
  public function __construct(
    string $title = 'Operation Successful',
    string $description = 'Your operation was completed successfully.',
    int $statusCode = 200
  )
  {
    parent::__construct([
      '@context' => '/contexts/SuccessMessage',
      '@type' => 'hydra:Status',
      'hydra:title' => $title,
      'hydra:description' => $description
    ], $statusCode);
  }
}

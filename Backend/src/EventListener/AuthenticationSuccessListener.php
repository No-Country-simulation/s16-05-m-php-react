<?php

namespace App\EventListener;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\Security\Core\User\UserInterface;

use function Symfony\Component\Clock\now;

class AuthenticationSuccessListener
{
  /**
   * @param AuthenticationSuccessEvent $event
   */
  public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
  {
    $data = $event->getData();
    /** @var User $user */
    $user = $event->getUser();

    if (!$user instanceof UserInterface) {
      return;
    }
    
    $data['roles'] = $user->getRoles();
    $data['username'] = $user->getUsername();
    $data['expiresAt'] = now('+1 hour')->getTimestamp() * 1000;

    $event->setData($data);
  }
}

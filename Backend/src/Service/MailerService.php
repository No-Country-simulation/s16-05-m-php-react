<?php

namespace App\Service;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class MailerService 
{
  public function __construct(
    private MailerInterface $mailer
  ) {}

  public function sendEmail(string $to, string $subject, string $content)
  {
    $email = (new Email())
      ->from($_ENV['CUSTOM_EMAIL'])
      ->to($to)
      ->subject($subject)
      ->text($content);

    $this->mailer->send($email);
  }
}
<?php

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
      ->from('postmaster@sandbox00432607f37847d89d11dfe6a3128b99.mailgun.org')
      ->to($to)
      ->subject($subject)
      ->text($content);

    $this->mailer->send($email);
  }
}
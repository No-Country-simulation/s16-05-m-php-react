<?php

namespace App\Service;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;
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

  public function sendEmailWithTemplate(string $to, string $subject, string $templatePath, array $context)
  {
    $email = (new TemplatedEmail())
      ->from($_ENV['CUSTOM_EMAIL'])
      ->to($to)
      ->subject($subject)
      ->htmlTemplate($templatePath)
      ->context($context);
      
    $this->mailer->send($email);
  }
}
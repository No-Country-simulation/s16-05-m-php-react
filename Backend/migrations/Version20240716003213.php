<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240716003213 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation ADD date DATE NOT NULL COMMENT \'(DC2Type:date_immutable)\', ADD time_from TIME NOT NULL COMMENT \'(DC2Type:time_immutable)\', ADD time_to TIME NOT NULL COMMENT \'(DC2Type:time_immutable)\'');
        $this->addSql('ALTER TABLE reservation DROP date_from, DROP date_to');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation DROP date, DROP time_from, DROP time_to');
        $this->addSql('ALTER TABLE reservation ADD date_from DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD date_to DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\',');
    }
}

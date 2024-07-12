<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240712130439 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Rename available_sits to capacity and add min_required_capacity';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `table` ADD min_required_capacity INT NOT NULL, CHANGE available_sits capacity INT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `table` ADD available_sits INT NOT NULL, DROP capacity, DROP min_required_capacity');
    }
}

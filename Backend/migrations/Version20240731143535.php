<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240731143535 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `table` DROP attendee_count');
        $this->addSql('ALTER TABLE reservation ADD attendee_count INT');
        $this->addSql('UPDATE reservation SET attendee_count = (SELECT min_required_capacity FROM `table` WHERE reservation._table_id = `table`.id)');
        $this->addSql('ALTER TABLE reservation CHANGE attendee_count attendee_count INT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation DROP attendee_count');
        $this->addSql('ALTER TABLE `table` ADD attendee_count INT');
        $this->addSql('UPDATE `table` SET attendee_count = `table`.min_required_capacity');
        $this->addSql('ALTER TABLE `table` CHANGE attendee_count attendee_count INT NOT NULL');
    }
}

<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240730124832 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE reservation CHANGE status status VARCHAR(255)');
        $this->addSql('UPDATE reservation SET status = NULL');
        $this->addSql('ALTER TABLE reservation CHANGE status status INT');
        $this->addSql('UPDATE reservation SET status = 6');
        $this->addSql('ALTER TABLE reservation CHANGE status status INT NOT NULL');
    }
    
    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE reservation CHANGE status status INT');
        $this->addSql('UPDATE reservation SET status = NULL');
        $this->addSql('ALTER TABLE reservation CHANGE status status VARCHAR(255)');
        $this->addSql('UPDATE reservation SET status = "pending"');
        $this->addSql('ALTER TABLE reservation CHANGE status status VARCHAR(255) NOT NULL');
    }
}

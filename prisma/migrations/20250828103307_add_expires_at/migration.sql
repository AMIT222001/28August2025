/*
  Warnings:

  - Added the required column `expiresAt` to the `Data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `data` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `expiresAt` DATETIME(3) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropIndex
DROP INDEX `Data_id_key` ON `data`;

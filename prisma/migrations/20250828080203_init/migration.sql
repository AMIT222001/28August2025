-- CreateTable
CREATE TABLE `Data` (
    `id` INTEGER NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `volume_24h` VARCHAR(191) NOT NULL,
    `percent_change_1h` VARCHAR(191) NOT NULL,
    `percent_change_24h` VARCHAR(191) NOT NULL,
    `percent_change_7d` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Data_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

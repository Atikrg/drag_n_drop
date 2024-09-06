-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_name_key`(`name`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `task_id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`task_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

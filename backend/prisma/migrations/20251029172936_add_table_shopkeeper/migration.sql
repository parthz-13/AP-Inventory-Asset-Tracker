/*
  Warnings:

  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Bill_Date` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `Bill_No` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `Item_Name` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `Qty` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `Total_Price` on the `Transaction` table. All the data in the column will be lost.
  - You are about to alter the column `item_price` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to drop the `item` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `shop_id` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Made the column `cust_name` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `item_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shop_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_customer_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_item_fkey`;

-- DropIndex
DROP INDEX `Customer_cust_name_key` ON `Customer`;

-- DropIndex
DROP INDEX `Customer_email_key` ON `Customer`;

-- DropIndex
DROP INDEX `Transaction_customer_fkey` ON `Transaction`;

-- DropIndex
DROP INDEX `Transaction_item_fkey` ON `Transaction`;

-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `shop_id` INTEGER NOT NULL,
    MODIFY `cust_name` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Transaction` DROP PRIMARY KEY,
    DROP COLUMN `Bill_Date`,
    DROP COLUMN `Bill_No`,
    DROP COLUMN `Item_Name`,
    DROP COLUMN `Name`,
    DROP COLUMN `Qty`,
    DROP COLUMN `Total_Price`,
    ADD COLUMN `bill_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `bill_no` VARCHAR(191) NULL,
    ADD COLUMN `cust_id` INTEGER NULL,
    ADD COLUMN `item_id` INTEGER NOT NULL,
    ADD COLUMN `qty` INTEGER NOT NULL,
    ADD COLUMN `shop_id` INTEGER NOT NULL,
    ADD COLUMN `total_price` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `transaction_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `item_price` DECIMAL(10, 2) NOT NULL,
    ADD PRIMARY KEY (`transaction_id`);

-- DropTable
DROP TABLE `item`;

-- CreateTable
CREATE TABLE `Shopkeeper` (
    `shop_id` INTEGER NOT NULL AUTO_INCREMENT,
    `shop_name` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Shopkeeper_shop_name_key`(`shop_name`),
    UNIQUE INDEX `Shopkeeper_email_key`(`email`),
    PRIMARY KEY (`shop_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NULL,
    `stock` INTEGER NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `shop_id` INTEGER NOT NULL,

    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_shop_id_fkey` FOREIGN KEY (`shop_id`) REFERENCES `Shopkeeper`(`shop_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_shop_id_fkey` FOREIGN KEY (`shop_id`) REFERENCES `Shopkeeper`(`shop_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_shop_id_fkey` FOREIGN KEY (`shop_id`) REFERENCES `Shopkeeper`(`shop_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_cust_id_fkey` FOREIGN KEY (`cust_id`) REFERENCES `Customer`(`cust_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Item`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

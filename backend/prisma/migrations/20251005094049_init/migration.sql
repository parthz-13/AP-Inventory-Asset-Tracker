-- CreateTable
CREATE TABLE `Customer` (
    `cust_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cust_name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,

    UNIQUE INDEX `Customer_cust_name_key`(`cust_name`),
    UNIQUE INDEX `Customer_email_key`(`email`),
    PRIMARY KEY (`cust_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item` (
    `item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NULL,
    `item_name` VARCHAR(191) NULL,
    `stock` INTEGER NULL,
    `price` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,

    UNIQUE INDEX `item_item_name_key`(`item_name`),
    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `Bill_No` INTEGER NOT NULL AUTO_INCREMENT,
    `Bill_Date` DATETIME(3) NULL,
    `Name` VARCHAR(191) NULL,
    `Item_Name` VARCHAR(191) NULL,
    `Qty` INTEGER NULL,
    `item_price` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    `Total_Price` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,

    PRIMARY KEY (`Bill_No`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_customer_fkey` FOREIGN KEY (`Name`) REFERENCES `Customer`(`cust_name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_item_fkey` FOREIGN KEY (`Item_Name`) REFERENCES `item`(`item_name`) ON DELETE SET NULL ON UPDATE CASCADE;

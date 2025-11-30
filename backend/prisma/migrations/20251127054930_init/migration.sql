-- CreateTable
CREATE TABLE "Shopkeeper" (
    "shop_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop_name" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Customer" (
    "cust_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cust_name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "shop_id" INTEGER NOT NULL,
    CONSTRAINT "Customer_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "Shopkeeper" ("shop_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Item" (
    "item_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "item_name" TEXT NOT NULL,
    "category" TEXT,
    "stock" INTEGER,
    "price" DECIMAL NOT NULL,
    "shop_id" INTEGER NOT NULL,
    CONSTRAINT "Item_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "Shopkeeper" ("shop_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transaction_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bill_no" TEXT,
    "bill_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "qty" INTEGER NOT NULL,
    "item_price" DECIMAL NOT NULL,
    "total_price" DECIMAL NOT NULL,
    "shop_id" INTEGER NOT NULL,
    "cust_id" INTEGER,
    "item_id" INTEGER NOT NULL,
    CONSTRAINT "Transaction_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "Shopkeeper" ("shop_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_cust_id_fkey" FOREIGN KEY ("cust_id") REFERENCES "Customer" ("cust_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item" ("item_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Shopkeeper_shop_name_key" ON "Shopkeeper"("shop_name");

-- CreateIndex
CREATE UNIQUE INDEX "Shopkeeper_email_key" ON "Shopkeeper"("email");

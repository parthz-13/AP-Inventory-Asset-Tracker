-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "item_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "item_name" TEXT NOT NULL,
    "category" TEXT,
    "stock" INTEGER,
    "price" DECIMAL NOT NULL,
    "cost_price" DECIMAL NOT NULL DEFAULT 0,
    "shop_id" INTEGER NOT NULL,
    CONSTRAINT "Item_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "Shopkeeper" ("shop_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("category", "item_id", "item_name", "price", "shop_id", "stock") SELECT "category", "item_id", "item_name", "price", "shop_id", "stock" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

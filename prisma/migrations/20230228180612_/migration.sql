/*
  Warnings:

  - You are about to alter the column `invoice_date` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to drop the column `last_stock_update_date` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `sale_date` on the `Sale` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `created_at` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `updated_at` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `purchase_date` on the `Purchase` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - Added the required column `branch_id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inventory_branch_id` to the `Branch` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customer_id" TEXT NOT NULL,
    "correlative_id" TEXT NOT NULL,
    "invoice_header" TEXT NOT NULL,
    "sale_id" TEXT NOT NULL,
    "total_sale_amount" REAL NOT NULL,
    "invoice_date" DATETIME NOT NULL,
    CONSTRAINT "Invoice_correlative_id_fkey" FOREIGN KEY ("correlative_id") REFERENCES "Correlative" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Invoice_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Invoice" ("correlative_id", "customer_id", "id", "invoice_date", "invoice_header", "sale_id", "total_sale_amount") SELECT "correlative_id", "customer_id", "id", "invoice_date", "invoice_header", "sale_id", "total_sale_amount" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE UNIQUE INDEX "Invoice_customer_id_key" ON "Invoice"("customer_id");
CREATE UNIQUE INDEX "Invoice_correlative_id_key" ON "Invoice"("correlative_id");
CREATE UNIQUE INDEX "Invoice_sale_id_key" ON "Invoice"("sale_id");
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "barcode" TEXT,
    "sale_price" REAL NOT NULL,
    "purchase_price" REAL NOT NULL,
    "stock_quantity" INTEGER NOT NULL,
    "branch_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Product_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("barcode", "description", "id", "name", "purchase_price", "sale_price", "stock_quantity") SELECT "barcode", "description", "id", "name", "purchase_price", "sale_price", "stock_quantity" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_products_2" ON "Product"("barcode");
Pragma writable_schema=0;
CREATE TABLE "new_Sale" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customer_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "sale_price" REAL NOT NULL,
    "sold_quantity" INTEGER NOT NULL,
    "sale_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Sale_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Sale_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sale" ("customer_id", "id", "product_id", "sale_date", "sale_price", "sold_quantity") SELECT "customer_id", "id", "product_id", "sale_date", "sale_price", "sold_quantity" FROM "Sale";
DROP TABLE "Sale";
ALTER TABLE "new_Sale" RENAME TO "Sale";
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Company" ("address", "created_at", "id", "name", "phone", "updated_at") SELECT "address", "created_at", "id", "name", "phone", "updated_at" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE TABLE "new_Purchase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "supplier_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "purchase_price" REAL NOT NULL,
    "purchased_quantity" INTEGER NOT NULL,
    "purchase_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Purchase_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Purchase_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Purchase" ("id", "product_id", "purchase_date", "purchase_price", "purchased_quantity", "supplier_id") SELECT "id", "product_id", "purchase_date", "purchase_price", "purchased_quantity", "supplier_id" FROM "Purchase";
DROP TABLE "Purchase";
ALTER TABLE "new_Purchase" RENAME TO "Purchase";
CREATE TABLE "new_Branch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "inventory_branch_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT NOT NULL,
    CONSTRAINT "Branch_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Branch" ("address", "company_id", "created_at", "id", "name", "phone", "updated_at") SELECT "address", "company_id", "created_at", "id", "name", "phone", "updated_at" FROM "Branch";
DROP TABLE "Branch";
ALTER TABLE "new_Branch" RENAME TO "Branch";
CREATE UNIQUE INDEX "Branch_inventory_branch_id_key" ON "Branch"("inventory_branch_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

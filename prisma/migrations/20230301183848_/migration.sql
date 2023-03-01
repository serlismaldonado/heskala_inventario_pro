/*
  Warnings:

  - You are about to drop the column `product_id` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `salt` on the `User` table. All the data in the column will be lost.
  - Added the required column `id_company` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "theme" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "date_format" TEXT NOT NULL,
    "time_format" TEXT NOT NULL,
    "decimal_separator" TEXT NOT NULL,
    "thousands_separator" TEXT NOT NULL,
    "decimal_places" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "UserPreferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CompanySettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currency" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "date_format" TEXT NOT NULL,
    "time_format" TEXT NOT NULL,
    "decimal_separator" TEXT NOT NULL,
    "thousands_separator" TEXT NOT NULL,
    "decimal_places" INTEGER NOT NULL,
    CONSTRAINT "CompanySettings_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Taxes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company_setting_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "value" REAL NOT NULL,
    CONSTRAINT "Taxes_company_setting_id_fkey" FOREIGN KEY ("company_setting_id") REFERENCES "CompanySettings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductSales" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sale_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Quoted',
    CONSTRAINT "ProductSales_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sale" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductSales_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "ProductVersion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProductToTaxes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ProductToTaxes_A_fkey" FOREIGN KEY ("A") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductToTaxes_B_fkey" FOREIGN KEY ("B") REFERENCES "Taxes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sale" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sale_price" REAL NOT NULL DEFAULT 0,
    "sold_quantity" INTEGER NOT NULL DEFAULT 0,
    "sale_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Quoted',
    CONSTRAINT "Sale_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sale" ("customer_id", "id", "sale_date", "sale_price", "sold_quantity") SELECT "customer_id", "id", "sale_date", "sale_price", "sold_quantity" FROM "Sale";
DROP TABLE "Sale";
ALTER TABLE "new_Sale" RENAME TO "Sale";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "last_name" TEXT,
    "hashed_password" TEXT,
    "role_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("company_id", "email", "hashed_password", "id", "name", "role_id") SELECT "company_id", "email", "hashed_password", "id", "name", "role_id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Supplier" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "id_company" TEXT NOT NULL,
    CONSTRAINT "Supplier_id_company_fkey" FOREIGN KEY ("id_company") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Supplier" ("address", "email", "id", "name", "phone") SELECT "address", "email", "id", "name", "phone" FROM "Supplier";
DROP TABLE "Supplier";
ALTER TABLE "new_Supplier" RENAME TO "Supplier";
CREATE TABLE "new_Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "correlative_id" TEXT NOT NULL,
    "invoice_header" TEXT NOT NULL,
    "isv" REAL NOT NULL DEFAULT 0,
    "sale_id" TEXT NOT NULL,
    "total_sale_amount" REAL NOT NULL,
    "invoice_date" DATETIME NOT NULL,
    CONSTRAINT "Invoice_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sale" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Invoice_correlative_id_fkey" FOREIGN KEY ("correlative_id") REFERENCES "Correlative" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Invoice" ("correlative_id", "id", "invoice_date", "invoice_header", "sale_id", "total_sale_amount") SELECT "correlative_id", "id", "invoice_date", "invoice_header", "sale_id", "total_sale_amount" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
CREATE UNIQUE INDEX "Invoice_correlative_id_key" ON "Invoice"("correlative_id");
CREATE UNIQUE INDEX "Invoice_sale_id_key" ON "Invoice"("sale_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_user_id_key" ON "UserPreferences"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "CompanySettings_company_id_key" ON "CompanySettings"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToTaxes_AB_unique" ON "_ProductToTaxes"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToTaxes_B_index" ON "_ProductToTaxes"("B");

-- RedefineIndex
DROP INDEX "sqlite_autoindex_products_2";
CREATE UNIQUE INDEX "ProductVersion_barcode_key" ON "ProductVersion"("barcode");

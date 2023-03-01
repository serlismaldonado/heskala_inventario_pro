/*
  Warnings:

  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RolePermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `permission_id` on the `TablePermission` table. All the data in the column will be lost.
  - You are about to drop the column `barcode` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `purchase_price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sale_price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `stock_quantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Product` table. All the data in the column will be lost.
  - Added the required column `role_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_category` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_table` to the `TablePermission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand_id` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Permission";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RolePermission";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserPermission";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ProductVersion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "barcode" TEXT,
    "sale_price" REAL NOT NULL,
    "purchase_price" REAL NOT NULL,
    "stock_quantity" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProductVersion_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RoleToTablePermission" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_RoleToTablePermission_A_fkey" FOREIGN KEY ("A") REFERENCES "Role" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RoleToTablePermission_B_fkey" FOREIGN KEY ("B") REFERENCES "TablePermission" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_BrandToProductCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_BrandToProductCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Brand" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BrandToProductCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Purchase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "supplier_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "purchase_price" REAL NOT NULL,
    "purchased_quantity" INTEGER NOT NULL,
    "purchase_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Purchase_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "ProductVersion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Purchase_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Purchase" ("id", "product_id", "purchase_date", "purchase_price", "purchased_quantity", "supplier_id") SELECT "id", "product_id", "purchase_date", "purchase_price", "purchased_quantity", "supplier_id" FROM "Purchase";
DROP TABLE "Purchase";
ALTER TABLE "new_Purchase" RENAME TO "Purchase";
CREATE TABLE "new_Sale" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customer_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "sale_price" REAL NOT NULL,
    "sold_quantity" INTEGER NOT NULL,
    "sale_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Sale_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "ProductVersion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Sale_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sale" ("customer_id", "id", "product_id", "sale_date", "sale_price", "sold_quantity") SELECT "customer_id", "id", "product_id", "sale_date", "sale_price", "sold_quantity" FROM "Sale";
DROP TABLE "Sale";
ALTER TABLE "new_Sale" RENAME TO "Sale";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "hashed_password" TEXT,
    "salt" TEXT,
    "role_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("company_id", "email", "hashed_password", "id", "name", "salt") SELECT "company_id", "email", "hashed_password", "id", "name", "salt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    CONSTRAINT "Property_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Property_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "ProductVersion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Property" ("id", "name", "product_id", "value") SELECT "id", "name", "product_id", "value" FROM "Property";
DROP TABLE "Property";
ALTER TABLE "new_Property" RENAME TO "Property";
CREATE TABLE "new_TablePermission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "table_name" TEXT NOT NULL,
    "id_table" TEXT NOT NULL,
    "can_create" BOOLEAN NOT NULL,
    "can_read" BOOLEAN NOT NULL,
    "can_update" BOOLEAN NOT NULL,
    "can_delete" BOOLEAN NOT NULL
);
INSERT INTO "new_TablePermission" ("can_create", "can_delete", "can_read", "can_update", "id", "table_name") SELECT "can_create", "can_delete", "can_read", "can_update", "id", "table_name" FROM "TablePermission";
DROP TABLE "TablePermission";
ALTER TABLE "new_TablePermission" RENAME TO "TablePermission";
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "brand_id" TEXT NOT NULL,
    "branch_id" TEXT NOT NULL,
    CONSTRAINT "Product_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("branch_id", "description", "id", "name") SELECT "branch_id", "description", "id", "name" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_products_2" ON "ProductVersion"("barcode");
Pragma writable_schema=0;

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToTablePermission_AB_unique" ON "_RoleToTablePermission"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToTablePermission_B_index" ON "_RoleToTablePermission"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BrandToProductCategory_AB_unique" ON "_BrandToProductCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_BrandToProductCategory_B_index" ON "_BrandToProductCategory"("B");

/*
  Warnings:

  - You are about to drop the column `customer_id` on the `Invoice` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "correlative_id" TEXT NOT NULL,
    "invoice_header" TEXT NOT NULL,
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

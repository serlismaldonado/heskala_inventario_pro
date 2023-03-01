-- CreateTable
CREATE TABLE "Correlative" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "suffix" TEXT NOT NULL,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,
    "current" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customer_id" TEXT NOT NULL,
    "correlative_id" TEXT NOT NULL,
    "invoice_header" TEXT NOT NULL,
    "sale_id" TEXT NOT NULL,
    "total_sale_amount" REAL NOT NULL,
    "invoice_date" TEXT NOT NULL,
    CONSTRAINT "Invoice_correlative_id_fkey" FOREIGN KEY ("correlative_id") REFERENCES "Correlative" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Invoice_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Invoice" ("correlative_id", "customer_id", "id", "invoice_date", "invoice_header", "sale_id", "total_sale_amount") SELECT "correlative_id", "customer_id", "id", "invoice_date", "invoice_header", "sale_id", "total_sale_amount" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

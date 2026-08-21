/*
  Warnings:

  - You are about to drop the column `markup` on the `Product` table. All the data in the column will be lost.
  - Added the required column `source` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductSource" AS ENUM ('AMAZON', 'SHOPEE', 'MERCADOLIVRE');

-- DropIndex
DROP INDEX "Product_sourceUrl_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "markup",
ADD COLUMN     "profit" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "source" "ProductSource" NOT NULL;

-- CreateIndex
CREATE INDEX "Product_source_idx" ON "Product"("source");

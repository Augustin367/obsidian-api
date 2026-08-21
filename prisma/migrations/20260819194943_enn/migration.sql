/*
  Warnings:

  - The `brand` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProductBrand" AS ENUM ('APPLE', 'SAMSUNG');

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "category" DROP NOT NULL,
ALTER COLUMN "family" DROP NOT NULL,
DROP COLUMN "brand",
ADD COLUMN     "brand" "ProductBrand";

-- CreateIndex
CREATE INDEX "Product_brand_idx" ON "Product"("brand");

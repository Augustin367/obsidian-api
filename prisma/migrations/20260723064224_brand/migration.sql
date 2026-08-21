/*
  Warnings:

  - Added the required column `brand` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Brand" AS ENUM ('APPLE');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "brand",
ADD COLUMN     "brand" "Brand" NOT NULL;

-- CreateIndex
CREATE INDEX "Product_brand_idx" ON "Product"("brand");

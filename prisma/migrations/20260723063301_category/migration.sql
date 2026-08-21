/*
  Warnings:

  - You are about to drop the column `type` on the `Product` table. All the data in the column will be lost.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('IPHONE', 'IPAD', 'MACBOOK', 'APPLE_WATCH', 'AIRPODS', 'ACESSORY');

-- DropIndex
DROP INDEX "Product_type_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "type",
ADD COLUMN     "category" "ProductCategory" NOT NULL,
ADD COLUMN     "family" TEXT;

-- DropEnum
DROP TYPE "ProductType";

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "Product"("category");

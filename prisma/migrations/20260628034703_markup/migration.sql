/*
  Warnings:

  - You are about to drop the column `createdById` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - Added the required column `originalPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salePrice` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_createdById_fkey";

-- DropIndex
DROP INDEX "Product_createdById_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "createdById",
DROP COLUMN "price",
ADD COLUMN     "markup" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "originalPrice" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "salePrice" DECIMAL(10,2) NOT NULL;

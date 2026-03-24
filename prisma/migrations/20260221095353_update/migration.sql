/*
  Warnings:

  - A unique constraint covering the columns `[sourceUrl]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceUrl` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sourceUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_sourceUrl_key" ON "Product"("sourceUrl");

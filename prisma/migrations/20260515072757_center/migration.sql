/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to drop the `SmartPhone` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sourceHash]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sourceHash` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SmartPhone" DROP CONSTRAINT "SmartPhone_productId_fkey";

-- DropIndex
DROP INDEX "Product_sourceUrl_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imageUrl",
ADD COLUMN     "imageUrs" JSONB,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "sourceHash" TEXT NOT NULL,
ADD COLUMN     "type" "ProductType" NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- DropTable
DROP TABLE "SmartPhone";

-- CreateIndex
CREATE UNIQUE INDEX "Product_sourceHash_key" ON "Product"("sourceHash");

-- CreateIndex
CREATE INDEX "Product_userId_idx" ON "Product"("userId");

-- CreateIndex
CREATE INDEX "Product_type_idx" ON "Product"("type");

/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `SmartPhone` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clerkId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Product_updatedAt_key";

-- DropIndex
DROP INDEX "SmartPhone_updatedAt_key";

-- CreateIndex
CREATE UNIQUE INDEX "SmartPhone_productId_key" ON "SmartPhone"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

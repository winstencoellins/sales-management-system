/*
  Warnings:

  - Added the required column `productDescription` to the `WorkOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `WorkOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `worker` to the `WorkOrder` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ClientStatus" AS ENUM ('INACTIVE', 'ACTIVE');

-- DropForeignKey
ALTER TABLE "WorkOrder" DROP CONSTRAINT "WorkOrder_clientId_fkey";

-- DropForeignKey
ALTER TABLE "WorkOrder" DROP CONSTRAINT "WorkOrder_userId_fkey";

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "status" "ClientStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "WorkOrder" ADD COLUMN     "notes" TEXT,
ADD COLUMN     "productDescription" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "worker" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

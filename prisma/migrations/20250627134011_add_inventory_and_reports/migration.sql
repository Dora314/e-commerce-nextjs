/*
  Warnings:

  - A unique constraint covering the columns `[sku]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('SALES', 'INVENTORY', 'CUSTOMERS', 'FINANCIAL');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('READY', 'GENERATING', 'ERROR');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "maxStock" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "minStock" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "reorderPoint" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "sku" TEXT,
ADD COLUMN     "supplier" TEXT,
ADD COLUMN     "unitCost" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "ReportType" NOT NULL,
    "lastGenerated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "size" TEXT NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'READY',
    "filePath" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

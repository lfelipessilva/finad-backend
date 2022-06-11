/*
  Warnings:

  - You are about to alter the column `value` on the `Income` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `value` on the `Spent` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Income" ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Spent" ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;

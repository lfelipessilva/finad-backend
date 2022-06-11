/*
  Warnings:

  - Added the required column `value` to the `Income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Spent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "value" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "Spent" ADD COLUMN     "value" DECIMAL(65,30) NOT NULL;

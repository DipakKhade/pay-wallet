/*
  Warnings:

  - You are about to drop the column `username` on the `Merchant` table. All the data in the column will be lost.
  - Added the required column `merchantname` to the `Merchant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "username",
ADD COLUMN     "merchantname" TEXT NOT NULL;

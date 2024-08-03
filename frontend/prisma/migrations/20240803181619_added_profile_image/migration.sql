-- AlterTable
ALTER TABLE "Merchant" ADD COLUMN     "profilePicture" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePicture" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

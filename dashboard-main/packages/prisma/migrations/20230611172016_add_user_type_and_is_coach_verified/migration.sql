-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('COACH', 'INDIVIDUAL', 'ORGANIZATION');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isCoachVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userType" "UserType" NOT NULL DEFAULT 'COACH';

/*
  Warnings:

  - The primary key for the `UserCenter` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterEnum
ALTER TYPE "public"."Role" ADD VALUE 'MASTER';

-- AlterTable
ALTER TABLE "public"."UserCenter" DROP CONSTRAINT "UserCenter_pkey",
ADD COLUMN     "processo" TEXT NOT NULL DEFAULT 'EXPEDICAO',
ADD CONSTRAINT "UserCenter_pkey" PRIMARY KEY ("userId", "centerId", "processo");

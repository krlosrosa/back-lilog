/*
  Warnings:

  - You are about to drop the column `turno` on the `Transporte` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Transporte" DROP COLUMN "turno",
ADD COLUMN     "obs" TEXT,
ADD COLUMN     "prioridade" INTEGER NOT NULL DEFAULT 0;

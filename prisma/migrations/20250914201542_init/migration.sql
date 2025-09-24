/*
  Warnings:

  - Made the column `devolucaoNotasId` on table `devolucao_itens` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."devolucao_itens" DROP CONSTRAINT "devolucao_itens_devolucaoNotasId_fkey";

-- AlterTable
ALTER TABLE "public"."devolucao_itens" ALTER COLUMN "devolucaoNotasId" SET NOT NULL,
ALTER COLUMN "devolucaoNotasId" SET DATA TYPE TEXT;

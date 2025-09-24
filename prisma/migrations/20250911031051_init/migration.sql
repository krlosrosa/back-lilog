/*
  Warnings:

  - Added the required column `transportadora` to the `devolucao_demanda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."devolucao_demanda" ADD COLUMN     "transportadora" TEXT NOT NULL;

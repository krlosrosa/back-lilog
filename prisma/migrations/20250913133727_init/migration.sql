/*
  Warnings:

  - You are about to drop the column `avaria` on the `devolucao_itens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."devolucao_itens" DROP COLUMN "avaria",
ADD COLUMN     "avariaCaixas" INTEGER,
ADD COLUMN     "avariaUnidades" INTEGER;

/*
  Warnings:

  - Added the required column `descricao` to the `devolucao_itens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."devolucao_itens" ADD COLUMN     "descricao" TEXT NOT NULL,
ADD COLUMN     "fabricacao" TIMESTAMP(3),
ADD COLUMN     "sif" TEXT,
ALTER COLUMN "quantidadeCaixas" DROP NOT NULL,
ALTER COLUMN "quantidadeUnidades" DROP NOT NULL;

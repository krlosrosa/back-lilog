/*
  Warnings:

  - You are about to drop the column `exibirInfoCabecalho` on the `ConfiguracaoImpressaoMapa` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."ExibirClienteCabecalhoEnum" AS ENUM ('PRIMEIRO', 'TODOS', 'NENHUM');

-- AlterTable
ALTER TABLE "public"."ConfiguracaoImpressaoMapa" DROP COLUMN "exibirInfoCabecalho",
ADD COLUMN     "exibirClienteCabecalho" "public"."ExibirClienteCabecalhoEnum" DEFAULT 'NENHUM';

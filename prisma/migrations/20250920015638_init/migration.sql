/*
  Warnings:

  - You are about to drop the column `exibirClienteCabecalho` on the `ConfiguracaoImpressaoMapa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."ConfiguracaoImpressaoMapa" DROP COLUMN "exibirClienteCabecalho",
ADD COLUMN     "exibirInfoCabecalho" "public"."ExibirClienteCabecalhoEnum" DEFAULT 'NENHUM';

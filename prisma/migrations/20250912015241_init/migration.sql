/*
  Warnings:

  - You are about to drop the column `transportadora` on the `devolucao_demanda` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."devolucao_demanda" DROP COLUMN "transportadora",
ADD COLUMN     "nomeTransportadora" TEXT;

-- CreateTable
CREATE TABLE "public"."devolucao_transportadoras" (
    "nome" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "devolucao_transportadoras_pkey" PRIMARY KEY ("nome")
);

-- AddForeignKey
ALTER TABLE "public"."devolucao_demanda" ADD CONSTRAINT "devolucao_demanda_nomeTransportadora_fkey" FOREIGN KEY ("nomeTransportadora") REFERENCES "public"."devolucao_transportadoras"("nome") ON DELETE SET NULL ON UPDATE CASCADE;

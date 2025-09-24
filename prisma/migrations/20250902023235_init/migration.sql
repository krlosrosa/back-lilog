/*
  Warnings:

  - You are about to drop the `DashboardProdutividade` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."DashboardProdutividade" DROP CONSTRAINT "DashboardProdutividade_centerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DashboardProdutividade" DROP CONSTRAINT "DashboardProdutividade_funcionarioId_fkey";

-- DropTable
DROP TABLE "public"."DashboardProdutividade";

-- CreateTable
CREATE TABLE "public"."DashboardProdutividadeUser" (
    "id" SERIAL NOT NULL,
    "dataRegistro" TIMESTAMP(3) NOT NULL,
    "centerId" TEXT NOT NULL,
    "funcionarioId" TEXT NOT NULL,
    "totalCaixas" INTEGER NOT NULL,
    "totalUnidades" INTEGER NOT NULL,
    "totalPaletes" INTEGER NOT NULL,
    "totalEnderecos" INTEGER NOT NULL,
    "totalPausasQuantidade" INTEGER NOT NULL,
    "totalPausasTempo" INTEGER NOT NULL,
    "totalTempoTrabalhado" INTEGER NOT NULL,
    "totalDemandas" INTEGER NOT NULL,
    "processo" "public"."TipoProcesso" NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DashboardProdutividadeUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DashboardProdutividadeCenter" (
    "id" SERIAL NOT NULL,
    "dataRegistro" TIMESTAMP(3) NOT NULL,
    "centerId" TEXT NOT NULL,
    "totalCaixas" INTEGER NOT NULL,
    "totalUnidades" INTEGER NOT NULL,
    "totalPaletes" INTEGER NOT NULL,
    "totalEnderecos" INTEGER NOT NULL,
    "totalPausasQuantidade" INTEGER NOT NULL,
    "totalPausasTempo" INTEGER NOT NULL,
    "totalTempoTrabalhado" INTEGER NOT NULL,
    "totalDemandas" INTEGER NOT NULL,
    "processo" "public"."TipoProcesso" NOT NULL,
    "turno" "public"."Turno" NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DashboardProdutividadeCenter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DashboardProdutividadeUser_funcionarioId_centerId_processo__key" ON "public"."DashboardProdutividadeUser"("funcionarioId", "centerId", "processo", "dataRegistro");

-- CreateIndex
CREATE UNIQUE INDEX "DashboardProdutividadeCenter_centerId_processo_dataRegistro_key" ON "public"."DashboardProdutividadeCenter"("centerId", "processo", "dataRegistro", "turno");

-- AddForeignKey
ALTER TABLE "public"."DashboardProdutividadeUser" ADD CONSTRAINT "DashboardProdutividadeUser_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DashboardProdutividadeUser" ADD CONSTRAINT "DashboardProdutividadeUser_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DashboardProdutividadeCenter" ADD CONSTRAINT "DashboardProdutividadeCenter_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE RESTRICT ON UPDATE CASCADE;

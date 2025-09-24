/*
  Warnings:

  - A unique constraint covering the columns `[funcionarioId,centerId,processo,dataRegistro,turno]` on the table `DashboardProdutividadeUser` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."DashboardProdutividadeUser_funcionarioId_centerId_processo__key";

-- CreateIndex
CREATE UNIQUE INDEX "DashboardProdutividadeUser_funcionarioId_centerId_processo__key" ON "public"."DashboardProdutividadeUser"("funcionarioId", "centerId", "processo", "dataRegistro", "turno");

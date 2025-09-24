/*
  Warnings:

  - A unique constraint covering the columns `[demandaId]` on the table `devolucao_check_list` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "devolucao_check_list_demandaId_key" ON "public"."devolucao_check_list"("demandaId");

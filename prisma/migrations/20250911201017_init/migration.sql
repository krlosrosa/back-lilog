/*
  Warnings:

  - A unique constraint covering the columns `[empresa,notaFiscal,tipo]` on the table `devolucao_notas` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."devolucao_notas_empresa_notaFiscal_key";

-- CreateIndex
CREATE UNIQUE INDEX "devolucao_notas_empresa_notaFiscal_tipo_key" ON "public"."devolucao_notas"("empresa", "notaFiscal", "tipo");

/*
  Warnings:

  - A unique constraint covering the columns `[centerId,empresa]` on the table `ConfiguracaoImpressaoMapa` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."ConfiguracaoImpressaoMapa" ADD COLUMN     "empresa" TEXT NOT NULL DEFAULT 'LDB';

-- CreateIndex
CREATE UNIQUE INDEX "ConfiguracaoImpressaoMapa_centerId_empresa_key" ON "public"."ConfiguracaoImpressaoMapa"("centerId", "empresa");

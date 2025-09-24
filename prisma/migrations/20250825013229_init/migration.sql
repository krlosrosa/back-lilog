/*
  Warnings:

  - A unique constraint covering the columns `[centerId]` on the table `ConfiguracaoImpressaoMapa` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."ConfiguracaoImpressaoMapa" ADD COLUMN     "atribuidoPorId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ConfiguracaoImpressaoMapa_centerId_key" ON "public"."ConfiguracaoImpressaoMapa"("centerId");

-- AddForeignKey
ALTER TABLE "public"."ConfiguracaoImpressaoMapa" ADD CONSTRAINT "ConfiguracaoImpressaoMapa_atribuidoPorId_fkey" FOREIGN KEY ("atribuidoPorId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

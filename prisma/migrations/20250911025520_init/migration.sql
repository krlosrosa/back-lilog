-- DropForeignKey
ALTER TABLE "public"."devolucao_demanda" DROP CONSTRAINT "devolucao_demanda_conferenteId_fkey";

-- AlterTable
ALTER TABLE "public"."devolucao_demanda" ALTER COLUMN "conferenteId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."devolucao_demanda" ADD CONSTRAINT "devolucao_demanda_conferenteId_fkey" FOREIGN KEY ("conferenteId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

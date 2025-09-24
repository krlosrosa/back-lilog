-- CreateEnum
CREATE TYPE "public"."TipoDevolucaoNotas" AS ENUM ('DEVOLUCAO', 'DEVOLUCAO_PARCIAL', 'REENTREGA');

-- AlterTable
ALTER TABLE "public"."devolucao_notas" ADD COLUMN     "tipo" "public"."TipoDevolucaoNotas" NOT NULL DEFAULT 'DEVOLUCAO';

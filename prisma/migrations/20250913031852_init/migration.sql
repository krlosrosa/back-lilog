-- DropForeignKey
ALTER TABLE "public"."devolucao_demanda" DROP CONSTRAINT "devolucao_demanda_idTransportadora_fkey";

-- AlterTable
ALTER TABLE "public"."devolucao_demanda" ALTER COLUMN "idTransportadora" SET DATA TYPE TEXT;

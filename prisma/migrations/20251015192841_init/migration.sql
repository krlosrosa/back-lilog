/*
  Warnings:

  - The values [ATRIBUICAO_PALLET,FINALIZACAO_DEMANDA,LIBERACAO_CONFERENCIA,OUTRO] on the enum `TipoEvento` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."TipoEvento_new" AS ENUM ('CRIACAO_TRANSPORTE', 'INICIO_SEPARACAO', 'TERMINO_SEPARACAO', 'INICIO_CONFERENCIA', 'TERMINO_CONFERENCIA', 'INICIO_CARREGAMENTO', 'TERMINO_CARREGAMENTO', 'CORTE_PRODUTO', 'FATURADO', 'LIBERADO_PORTARIA');
ALTER TABLE "public"."HistoricoStatusTransporte" ALTER COLUMN "tipoEvento" TYPE "public"."TipoEvento_new" USING ("tipoEvento"::text::"public"."TipoEvento_new");
ALTER TYPE "public"."TipoEvento" RENAME TO "TipoEvento_old";
ALTER TYPE "public"."TipoEvento_new" RENAME TO "TipoEvento";
DROP TYPE "public"."TipoEvento_old";
COMMIT;

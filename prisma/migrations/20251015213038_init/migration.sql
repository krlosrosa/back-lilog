-- AlterTable
ALTER TABLE "public"."Transporte" ADD COLUMN     "carregamento" "public"."StatusPalete" NOT NULL DEFAULT 'NAO_INICIADO',
ADD COLUMN     "conferencia" "public"."StatusPalete" NOT NULL DEFAULT 'NAO_INICIADO',
ADD COLUMN     "separacao" "public"."StatusPalete" NOT NULL DEFAULT 'NAO_INICIADO';

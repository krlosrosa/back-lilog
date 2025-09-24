-- CreateEnum
CREATE TYPE "public"."MotivoCorteMercadoria" AS ENUM ('FALTA_MERCADORIA', 'FALTA_ESPACO');

-- CreateTable
CREATE TABLE "public"."CorteMercadoria" (
    "id" SERIAL NOT NULL,
    "produto" TEXT NOT NULL,
    "lote" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "unidadeMedida" TEXT NOT NULL,
    "motivo" "public"."MotivoCorteMercadoria" NOT NULL,
    "realizado" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "criadoPorId" TEXT NOT NULL,
    "transporteId" TEXT NOT NULL,

    CONSTRAINT "CorteMercadoria_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."CorteMercadoria" ADD CONSTRAINT "CorteMercadoria_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CorteMercadoria" ADD CONSTRAINT "CorteMercadoria_transporteId_fkey" FOREIGN KEY ("transporteId") REFERENCES "public"."Transporte"("numeroTransporte") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "public"."imagem" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tipo" TEXT,
    "processo_id" TEXT NOT NULL,
    "tipoProcesso" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "imagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."devolucao_check_list" (
    "id" SERIAL NOT NULL,
    "temperaturaBau" DOUBLE PRECISION NOT NULL,
    "temperaturaProduto" DOUBLE PRECISION NOT NULL,
    "demandaId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "devolucao_check_list_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."devolucao_check_list" ADD CONSTRAINT "devolucao_check_list_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

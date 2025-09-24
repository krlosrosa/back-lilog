-- CreateEnum
CREATE TYPE "public"."Empresa" AS ENUM ('ITB', 'LDB', 'DPA');

-- CreateEnum
CREATE TYPE "public"."TipoDevolucaoItens" AS ENUM ('CONTABIL', 'FISICO');

-- CreateEnum
CREATE TYPE "public"."TipoDevolucaoAnomalias" AS ENUM ('AVARIA', 'FALTA', 'SOBRA');

-- CreateEnum
CREATE TYPE "public"."StatusDevolucao" AS ENUM ('AGUARDANDO_LIBERACAO', 'AGUARDANDO_CONFERENCIA', 'EM_CONFERENCIA', 'CONFERENCIA_FINALIZADA', 'FINALIZADO', 'CANCELADO');

-- CreateTable
CREATE TABLE "public"."devolucao_demanda" (
    "id" SERIAL NOT NULL,
    "placa" TEXT NOT NULL,
    "motorista" TEXT NOT NULL,
    "telefone" TEXT,
    "cargaSegregada" BOOLEAN NOT NULL DEFAULT false,
    "retornoPalete" BOOLEAN NOT NULL DEFAULT false,
    "quantidadePaletes" INTEGER DEFAULT 0,
    "centerId" TEXT NOT NULL,
    "adicionadoPorId" TEXT NOT NULL,
    "conferenteId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "status" "public"."StatusDevolucao" NOT NULL DEFAULT 'AGUARDANDO_LIBERACAO',
    "fechouComAnomalia" BOOLEAN,
    "liberadoParaConferenciaEm" TIMESTAMP(3),
    "inicioConferenciaEm" TIMESTAMP(3),
    "fimConferenciaEm" TIMESTAMP(3),
    "finalizadoEm" TIMESTAMP(3),

    CONSTRAINT "devolucao_demanda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."devolucao_historico_status" (
    "id" SERIAL NOT NULL,
    "devolucaoDemandaId" INTEGER NOT NULL,
    "status" "public"."StatusDevolucao" NOT NULL,
    "responsavelId" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "devolucao_historico_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."devolucao_notas" (
    "id" SERIAL NOT NULL,
    "empresa" "public"."Empresa" NOT NULL,
    "devolucaoDemandaId" INTEGER NOT NULL,
    "notaFiscal" TEXT NOT NULL,
    "motivoDevolucao" TEXT NOT NULL,
    "descMotivoDevolucao" TEXT,
    "nfParcial" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "devolucao_notas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."devolucao_itens" (
    "id" SERIAL NOT NULL,
    "sku" TEXT NOT NULL,
    "lote" TEXT NOT NULL,
    "quantidadeCaixas" INTEGER NOT NULL,
    "quantidadeUnidades" INTEGER NOT NULL,
    "tipo" "public"."TipoDevolucaoItens" NOT NULL,
    "devolucaoNotasId" INTEGER,
    "demandaId" INTEGER NOT NULL,

    CONSTRAINT "devolucao_itens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."devolucao_anomalias" (
    "id" SERIAL NOT NULL,
    "demandaId" INTEGER NOT NULL,
    "tipo" "public"."TipoDevolucaoAnomalias" NOT NULL,
    "tratado" BOOLEAN NOT NULL DEFAULT false,
    "sku" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "lote" TEXT NOT NULL,
    "quantidadeCaixas" INTEGER NOT NULL,
    "quantidadeUnidades" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "devolucao_anomalias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "devolucao_notas_empresa_notaFiscal_key" ON "public"."devolucao_notas"("empresa", "notaFiscal");

-- AddForeignKey
ALTER TABLE "public"."devolucao_demanda" ADD CONSTRAINT "devolucao_demanda_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_demanda" ADD CONSTRAINT "devolucao_demanda_adicionadoPorId_fkey" FOREIGN KEY ("adicionadoPorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_demanda" ADD CONSTRAINT "devolucao_demanda_conferenteId_fkey" FOREIGN KEY ("conferenteId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_historico_status" ADD CONSTRAINT "devolucao_historico_status_devolucaoDemandaId_fkey" FOREIGN KEY ("devolucaoDemandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_historico_status" ADD CONSTRAINT "devolucao_historico_status_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_notas" ADD CONSTRAINT "devolucao_notas_devolucaoDemandaId_fkey" FOREIGN KEY ("devolucaoDemandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_itens" ADD CONSTRAINT "devolucao_itens_devolucaoNotasId_fkey" FOREIGN KEY ("devolucaoNotasId") REFERENCES "public"."devolucao_notas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_itens" ADD CONSTRAINT "devolucao_itens_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_anomalias" ADD CONSTRAINT "devolucao_anomalias_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

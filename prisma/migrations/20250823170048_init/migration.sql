-- CreateEnum
CREATE TYPE "public"."StatusTransporte" AS ENUM ('AGUARDANDO_SEPARACAO', 'EM_SEPARACAO', 'SEPARACAO_CONCLUIDA', 'EM_CONFERENCIA', 'CONFERENCIA_CONCLUIDA', 'EM_CARREGAMENTO', 'CARREGAMENTO_CONCLUIDO', 'FATURADO', 'LIBERADO_PORTARIA', 'CANCELADO');

-- CreateEnum
CREATE TYPE "public"."StatusPalete" AS ENUM ('NAO_INICIADO', 'EM_PROGRESSO', 'CONCLUIDO', 'EM_PAUSA');

-- CreateEnum
CREATE TYPE "public"."TipoProcesso" AS ENUM ('SEPARACAO', 'CARREGAMENTO', 'CONFERENCIA');

-- CreateEnum
CREATE TYPE "public"."StatusDemanda" AS ENUM ('EM_PROGRESSO', 'FINALIZADA', 'PAUSA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'FUNCIONARIO', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."Turno" AS ENUM ('MANHA', 'TARDE', 'NOITE');

-- CreateEnum
CREATE TYPE "public"."TipoImpressao" AS ENUM ('TRANSPORTE', 'CLIENTE');

-- CreateEnum
CREATE TYPE "public"."TipoQuebraPalete" AS ENUM ('LINHAS', 'PERCENTUAL');

-- CreateEnum
CREATE TYPE "public"."TipoEvento" AS ENUM ('CRIACAO_TRANSPORTE', 'ATRIBUICAO_PALLET', 'FINALIZACAO_DEMANDA', 'LIBERACAO_CONFERENCIA', 'OUTRO');

-- CreateTable
CREATE TABLE "public"."Center" (
    "centerId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "cluster" TEXT NOT NULL DEFAULT 'distribuicao',

    CONSTRAINT "Center_pkey" PRIMARY KEY ("centerId")
);

-- CreateTable
CREATE TABLE "public"."ConfiguracaoImpressaoMapa" (
    "id" TEXT NOT NULL,
    "tipoImpressao" "public"."TipoImpressao" NOT NULL,
    "quebraPalete" BOOLEAN NOT NULL DEFAULT false,
    "tipoQuebra" "public"."TipoQuebraPalete",
    "valorQuebra" DECIMAL(65,30),
    "separarPaleteFull" BOOLEAN NOT NULL DEFAULT false,
    "separarUnidades" BOOLEAN NOT NULL DEFAULT false,
    "exibirInfoCabecalho" BOOLEAN NOT NULL DEFAULT true,
    "segregarFifo" TEXT[],
    "ordemColunas" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "centerId" TEXT NOT NULL,
    "dataMaximaPercentual" INTEGER NOT NULL DEFAULT 0,
    "dataMinimaPercentual" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ConfiguracaoImpressaoMapa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Configuracao" (
    "id" SERIAL NOT NULL,
    "chave" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "descricao" TEXT,
    "centerId" TEXT,

    CONSTRAINT "Configuracao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "centerId" TEXT NOT NULL,
    "token" TEXT,
    "turno" "public"."Turno" NOT NULL DEFAULT 'NOITE',
    "resetSenha" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserCenter" (
    "userId" TEXT NOT NULL,
    "centerId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "public"."Role" NOT NULL DEFAULT 'FUNCIONARIO',

    CONSTRAINT "UserCenter_pkey" PRIMARY KEY ("userId","centerId")
);

-- CreateTable
CREATE TABLE "public"."Transporte" (
    "id" SERIAL NOT NULL,
    "numeroTransporte" TEXT NOT NULL,
    "status" "public"."StatusTransporte" NOT NULL DEFAULT 'AGUARDANDO_SEPARACAO',
    "nomeRota" TEXT NOT NULL,
    "nomeTransportadora" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "cadastradoPorId" TEXT NOT NULL,
    "dataExpedicao" TIMESTAMP(3) NOT NULL,
    "turno" "public"."Turno",
    "centerId" TEXT NOT NULL,

    CONSTRAINT "Transporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Palete" (
    "id" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "quantidadeCaixas" INTEGER NOT NULL,
    "quantidadeUnidades" INTEGER NOT NULL,
    "quantidadePaletes" INTEGER NOT NULL,
    "enderecoVisitado" INTEGER NOT NULL,
    "segmento" TEXT NOT NULL,
    "transporteId" TEXT NOT NULL,
    "tipoProcesso" "public"."TipoProcesso" NOT NULL DEFAULT 'SEPARACAO',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "demandaId" INTEGER,
    "status" "public"."StatusPalete" NOT NULL DEFAULT 'NAO_INICIADO',
    "validado" BOOLEAN NOT NULL DEFAULT false,
    "criadoPorId" TEXT NOT NULL,

    CONSTRAINT "Palete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Demanda" (
    "id" SERIAL NOT NULL,
    "processo" "public"."TipoProcesso" NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL,
    "fim" TIMESTAMP(3),
    "status" "public"."StatusDemanda" NOT NULL DEFAULT 'EM_PROGRESSO',
    "cadastradoPorId" TEXT NOT NULL,
    "turno" "public"."Turno" NOT NULL,
    "funcionarioId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "centerId" TEXT NOT NULL,
    "obs" TEXT,

    CONSTRAINT "Demanda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HistoricoStatusTransporte" (
    "id" SERIAL NOT NULL,
    "alteradoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipoEvento" "public"."TipoEvento" NOT NULL,
    "descricao" TEXT NOT NULL,
    "transporteId" TEXT NOT NULL,
    "alteradoPorId" TEXT,

    CONSTRAINT "HistoricoStatusTransporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HistoricoImpressaoMapa" (
    "id" SERIAL NOT NULL,
    "impressoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transporteId" TEXT NOT NULL,
    "impressoPorId" TEXT NOT NULL,
    "tipoImpressao" "public"."TipoProcesso" NOT NULL,

    CONSTRAINT "HistoricoImpressaoMapa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pausa" (
    "id" SERIAL NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL,
    "fim" TIMESTAMP(3),
    "motivo" TEXT,
    "descricao" TEXT,
    "demandaId" INTEGER NOT NULL,
    "registradoPorId" TEXT NOT NULL,
    "pausaGeralId" INTEGER,

    CONSTRAINT "Pausa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PausaGeral" (
    "id" SERIAL NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL,
    "fim" TIMESTAMP(3),
    "motivo" TEXT,
    "centerId" TEXT NOT NULL,
    "processo" "public"."TipoProcesso" NOT NULL,
    "turno" "public"."Turno" NOT NULL,
    "registradoPorId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PausaGeral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DashboardProdutividade" (
    "id" SERIAL NOT NULL,
    "dataRegistro" TIMESTAMP(3) NOT NULL,
    "centerId" TEXT NOT NULL,
    "funcionarioId" TEXT NOT NULL,
    "totalCaixas" INTEGER NOT NULL,
    "totalUnidades" INTEGER NOT NULL,
    "totalPaletes" INTEGER NOT NULL,
    "totalEnderecos" INTEGER NOT NULL,
    "totalPausasQuantidade" INTEGER NOT NULL,
    "totalPausasTempo" INTEGER NOT NULL,
    "totalTempoTrabalhado" INTEGER NOT NULL,
    "totalDemandas" INTEGER NOT NULL,
    "processo" "public"."TipoProcesso" NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DashboardProdutividade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Center_centerId_key" ON "public"."Center"("centerId");

-- CreateIndex
CREATE UNIQUE INDEX "Configuracao_chave_centerId_key" ON "public"."Configuracao"("chave", "centerId");

-- CreateIndex
CREATE UNIQUE INDEX "Transporte_numeroTransporte_key" ON "public"."Transporte"("numeroTransporte");

-- CreateIndex
CREATE UNIQUE INDEX "DashboardProdutividade_funcionarioId_centerId_processo_data_key" ON "public"."DashboardProdutividade"("funcionarioId", "centerId", "processo", "dataRegistro");

-- AddForeignKey
ALTER TABLE "public"."ConfiguracaoImpressaoMapa" ADD CONSTRAINT "ConfiguracaoImpressaoMapa_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Configuracao" ADD CONSTRAINT "Configuracao_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserCenter" ADD CONSTRAINT "UserCenter_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserCenter" ADD CONSTRAINT "UserCenter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transporte" ADD CONSTRAINT "Transporte_cadastradoPorId_fkey" FOREIGN KEY ("cadastradoPorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transporte" ADD CONSTRAINT "Transporte_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Palete" ADD CONSTRAINT "Palete_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Palete" ADD CONSTRAINT "Palete_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "public"."Demanda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Palete" ADD CONSTRAINT "Palete_transporteId_fkey" FOREIGN KEY ("transporteId") REFERENCES "public"."Transporte"("numeroTransporte") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Demanda" ADD CONSTRAINT "Demanda_cadastradoPorId_fkey" FOREIGN KEY ("cadastradoPorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Demanda" ADD CONSTRAINT "Demanda_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Demanda" ADD CONSTRAINT "Demanda_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HistoricoStatusTransporte" ADD CONSTRAINT "HistoricoStatusTransporte_alteradoPorId_fkey" FOREIGN KEY ("alteradoPorId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HistoricoStatusTransporte" ADD CONSTRAINT "HistoricoStatusTransporte_transporteId_fkey" FOREIGN KEY ("transporteId") REFERENCES "public"."Transporte"("numeroTransporte") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HistoricoImpressaoMapa" ADD CONSTRAINT "HistoricoImpressaoMapa_impressoPorId_fkey" FOREIGN KEY ("impressoPorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HistoricoImpressaoMapa" ADD CONSTRAINT "HistoricoImpressaoMapa_transporteId_fkey" FOREIGN KEY ("transporteId") REFERENCES "public"."Transporte"("numeroTransporte") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pausa" ADD CONSTRAINT "Pausa_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "public"."Demanda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pausa" ADD CONSTRAINT "Pausa_pausaGeralId_fkey" FOREIGN KEY ("pausaGeralId") REFERENCES "public"."PausaGeral"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pausa" ADD CONSTRAINT "Pausa_registradoPorId_fkey" FOREIGN KEY ("registradoPorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PausaGeral" ADD CONSTRAINT "PausaGeral_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PausaGeral" ADD CONSTRAINT "PausaGeral_registradoPorId_fkey" FOREIGN KEY ("registradoPorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DashboardProdutividade" ADD CONSTRAINT "DashboardProdutividade_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DashboardProdutividade" ADD CONSTRAINT "DashboardProdutividade_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

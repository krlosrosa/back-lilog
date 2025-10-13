-- CreateEnum
CREATE TYPE "public"."StatusTransporte" AS ENUM ('AGUARDANDO_SEPARACAO', 'EM_SEPARACAO', 'SEPARACAO_CONCLUIDA', 'EM_CONFERENCIA', 'CONFERENCIA_CONCLUIDA', 'EM_CARREGAMENTO', 'CARREGAMENTO_CONCLUIDO', 'FATURADO', 'LIBERADO_PORTARIA', 'CANCELADO');

-- CreateEnum
CREATE TYPE "public"."StatusPalete" AS ENUM ('NAO_INICIADO', 'EM_PROGRESSO', 'CONCLUIDO', 'EM_PAUSA');

-- CreateEnum
CREATE TYPE "public"."TipoProcesso" AS ENUM ('SEPARACAO', 'CARREGAMENTO', 'CONFERENCIA');

-- CreateEnum
CREATE TYPE "public"."StatusDemanda" AS ENUM ('EM_PROGRESSO', 'FINALIZADA', 'PAUSA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('FUNCIONARIO', 'USER', 'ADMIN', 'MASTER');

-- CreateEnum
CREATE TYPE "public"."Turno" AS ENUM ('MANHA', 'TARDE', 'NOITE');

-- CreateEnum
CREATE TYPE "public"."TipoImpressao" AS ENUM ('TRANSPORTE', 'CLIENTE');

-- CreateEnum
CREATE TYPE "public"."TipoQuebraPalete" AS ENUM ('LINHAS', 'PERCENTUAL');

-- CreateEnum
CREATE TYPE "public"."TipoEvento" AS ENUM ('CRIACAO_TRANSPORTE', 'ATRIBUICAO_PALLET', 'FINALIZACAO_DEMANDA', 'LIBERACAO_CONFERENCIA', 'OUTRO');

-- CreateEnum
CREATE TYPE "public"."MotivoCorteMercadoria" AS ENUM ('FALTA_MERCADORIA', 'FALTA_ESPACO');

-- CreateEnum
CREATE TYPE "public"."Empresa" AS ENUM ('ITB', 'LDB', 'DPA');

-- CreateEnum
CREATE TYPE "public"."TipoDevolucaoItens" AS ENUM ('CONTABIL', 'FISICO');

-- CreateEnum
CREATE TYPE "public"."TipoDevolucaoAnomalias" AS ENUM ('AVARIA', 'FALTA', 'SOBRA');

-- CreateEnum
CREATE TYPE "public"."StatusDevolucao" AS ENUM ('AGUARDANDO_LIBERACAO', 'AGUARDANDO_CONFERENCIA', 'EM_CONFERENCIA', 'CONFERENCIA_FINALIZADA', 'FINALIZADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "public"."TipoPeso" AS ENUM ('PVAR', 'PPAR');

-- CreateEnum
CREATE TYPE "public"."SegmentoProduto" AS ENUM ('SECO', 'REFR');

-- CreateEnum
CREATE TYPE "public"."TipoDevolucaoNotas" AS ENUM ('DEVOLUCAO', 'DEVOLUCAO_PARCIAL', 'REENTREGA');

-- CreateEnum
CREATE TYPE "public"."ExibirClienteCabecalhoEnum" AS ENUM ('PRIMEIRO', 'TODOS', 'NENHUM');

-- CreateTable
CREATE TABLE "public"."produto" (
    "codEan" TEXT,
    "codDum" TEXT,
    "sku" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "shelf" INTEGER NOT NULL,
    "tipoPeso" "public"."TipoPeso" NOT NULL,
    "pesoLiquidoCaixa" DECIMAL(65,30) NOT NULL,
    "pesoLiquidoUnidade" DECIMAL(65,30) NOT NULL,
    "unPorCaixa" INTEGER NOT NULL,
    "caixaPorPallet" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "segmento" "public"."SegmentoProduto" NOT NULL,
    "empresa" "public"."Empresa" NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("sku")
);

-- CreateTable
CREATE TABLE "public"."Center" (
    "centerId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "cluster" TEXT NOT NULL,

    CONSTRAINT "Center_pkey" PRIMARY KEY ("centerId")
);

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
CREATE TABLE "public"."ConfiguracaoImpressaoMapa" (
    "id" TEXT NOT NULL,
    "tipoImpressao" "public"."TipoImpressao" NOT NULL,
    "quebraPalete" BOOLEAN NOT NULL DEFAULT false,
    "tipoQuebra" "public"."TipoQuebraPalete",
    "valorQuebra" DECIMAL(65,30),
    "separarPaleteFull" BOOLEAN NOT NULL DEFAULT false,
    "separarUnidades" BOOLEAN NOT NULL DEFAULT false,
    "exibirInfoCabecalho" "public"."ExibirClienteCabecalhoEnum" DEFAULT 'NENHUM',
    "segregarFifo" TEXT[],
    "dataMaximaPercentual" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "centerId" TEXT NOT NULL,
    "atribuidoPorId" TEXT,

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
    "processo" TEXT NOT NULL DEFAULT 'EXPEDICAO',
    "role" "public"."Role" NOT NULL DEFAULT 'FUNCIONARIO',

    CONSTRAINT "UserCenter_pkey" PRIMARY KEY ("userId","centerId","processo")
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
    "dataExpedicao" TIMESTAMP(6) NOT NULL,
    "centerId" TEXT NOT NULL,
    "obs" TEXT,
    "prioridade" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Transporte_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "public"."DashboardProdutividadeUser" (
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
    "turno" "public"."Turno" NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DashboardProdutividadeUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DashboardProdutividadeCenter" (
    "id" SERIAL NOT NULL,
    "dataRegistro" TIMESTAMP(3) NOT NULL,
    "centerId" TEXT NOT NULL,
    "cluster" TEXT NOT NULL DEFAULT 'distribuicao',
    "empresa" TEXT NOT NULL DEFAULT 'LACTALIS',
    "totalCaixas" INTEGER NOT NULL,
    "totalUnidades" INTEGER NOT NULL,
    "totalPaletes" INTEGER NOT NULL,
    "totalEnderecos" INTEGER NOT NULL,
    "totalPausasQuantidade" INTEGER NOT NULL,
    "totalPausasTempo" INTEGER NOT NULL,
    "totalTempoTrabalhado" INTEGER NOT NULL,
    "totalDemandas" INTEGER NOT NULL,
    "processo" "public"."TipoProcesso" NOT NULL,
    "turno" "public"."Turno" NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DashboardProdutividadeCenter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AnomaliaProdutividade" (
    "id" SERIAL NOT NULL,
    "demandaId" INTEGER NOT NULL,
    "centerId" TEXT NOT NULL,
    "funcionarioId" TEXT NOT NULL,
    "nomeFuncionario" TEXT NOT NULL,
    "cadastroPorId" TEXT NOT NULL,
    "nomeCadastradoPor" TEXT NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL,
    "fim" TIMESTAMP(3),
    "caixas" INTEGER NOT NULL,
    "unidades" INTEGER NOT NULL,
    "paletes" INTEGER NOT NULL,
    "enderecosVisitado" INTEGER NOT NULL,
    "produtividade" DOUBLE PRECISION NOT NULL,
    "motivoAnomalia" TEXT NOT NULL,

    CONSTRAINT "AnomaliaProdutividade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."devolucao_demanda" (
    "id" SERIAL NOT NULL,
    "placa" TEXT NOT NULL,
    "motorista" TEXT NOT NULL,
    "idTransportadora" TEXT,
    "telefone" TEXT,
    "cargaSegregada" BOOLEAN NOT NULL DEFAULT false,
    "retornoPalete" BOOLEAN NOT NULL DEFAULT false,
    "quantidadePaletes" INTEGER DEFAULT 0,
    "doca" TEXT,
    "centerId" TEXT NOT NULL,
    "adicionadoPorId" TEXT NOT NULL,
    "conferenteId" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "status" "public"."StatusDevolucao" NOT NULL DEFAULT 'AGUARDANDO_LIBERACAO',
    "fechouComAnomalia" BOOLEAN,
    "liberadoParaConferenciaEm" TIMESTAMP(3),
    "inicioConferenciaEm" TIMESTAMP(3),
    "fimConferenciaEm" TIMESTAMP(3),
    "finalizadoEm" TIMESTAMP(3),
    "senha" TEXT NOT NULL,

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
    "idViagemRavex" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "tipo" "public"."TipoDevolucaoNotas" NOT NULL DEFAULT 'DEVOLUCAO',

    CONSTRAINT "devolucao_notas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."devolucao_itens" (
    "id" SERIAL NOT NULL,
    "sku" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "lote" TEXT,
    "fabricacao" TIMESTAMP(3),
    "sif" TEXT,
    "quantidadeCaixas" INTEGER,
    "quantidadeUnidades" INTEGER,
    "tipo" "public"."TipoDevolucaoItens" NOT NULL,
    "devolucaoNotasId" TEXT,
    "demandaId" INTEGER NOT NULL,
    "avariaCaixas" INTEGER,
    "avariaUnidades" INTEGER,

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

-- CreateTable
CREATE TABLE "public"."devolucao_transportadoras" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "centerId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "devolucao_transportadoras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."devolucao_check_list" (
    "id" SERIAL NOT NULL,
    "temperaturaBau" DOUBLE PRECISION NOT NULL,
    "temperaturaProduto" DOUBLE PRECISION NOT NULL,
    "demandaId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "anomalias" TEXT[],

    CONSTRAINT "devolucao_check_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DevolucaImagens" (
    "id" SERIAL NOT NULL,
    "demandaId" INTEGER NOT NULL,
    "processo" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "DevolucaImagens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."rules_engines" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "centerId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "conditions" JSONB NOT NULL,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rules_engines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Center_centerId_key" ON "public"."Center"("centerId");

-- CreateIndex
CREATE UNIQUE INDEX "ConfiguracaoImpressaoMapa_centerId_key" ON "public"."ConfiguracaoImpressaoMapa"("centerId");

-- CreateIndex
CREATE UNIQUE INDEX "Configuracao_chave_centerId_key" ON "public"."Configuracao"("chave", "centerId");

-- CreateIndex
CREATE UNIQUE INDEX "Transporte_numeroTransporte_key" ON "public"."Transporte"("numeroTransporte");

-- CreateIndex
CREATE UNIQUE INDEX "DashboardProdutividadeUser_funcionarioId_centerId_processo__key" ON "public"."DashboardProdutividadeUser"("funcionarioId", "centerId", "processo", "dataRegistro", "turno");

-- CreateIndex
CREATE UNIQUE INDEX "DashboardProdutividadeCenter_centerId_processo_dataRegistro_key" ON "public"."DashboardProdutividadeCenter"("centerId", "processo", "dataRegistro", "turno");

-- CreateIndex
CREATE UNIQUE INDEX "devolucao_notas_empresa_notaFiscal_tipo_key" ON "public"."devolucao_notas"("empresa", "notaFiscal", "tipo");

-- CreateIndex
CREATE UNIQUE INDEX "devolucao_transportadoras_nome_centerId_key" ON "public"."devolucao_transportadoras"("nome", "centerId");

-- CreateIndex
CREATE UNIQUE INDEX "devolucao_check_list_demandaId_key" ON "public"."devolucao_check_list"("demandaId");

-- CreateIndex
CREATE INDEX "rules_engines_centerId_enabled_idx" ON "public"."rules_engines"("centerId", "enabled");

-- CreateIndex
CREATE UNIQUE INDEX "rules_engines_name_centerId_key" ON "public"."rules_engines"("name", "centerId");

-- AddForeignKey
ALTER TABLE "public"."ConfiguracaoImpressaoMapa" ADD CONSTRAINT "ConfiguracaoImpressaoMapa_atribuidoPorId_fkey" FOREIGN KEY ("atribuidoPorId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "public"."CorteMercadoria" ADD CONSTRAINT "CorteMercadoria_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CorteMercadoria" ADD CONSTRAINT "CorteMercadoria_transporteId_fkey" FOREIGN KEY ("transporteId") REFERENCES "public"."Transporte"("numeroTransporte") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "public"."DashboardProdutividadeUser" ADD CONSTRAINT "DashboardProdutividadeUser_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DashboardProdutividadeUser" ADD CONSTRAINT "DashboardProdutividadeUser_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DashboardProdutividadeCenter" ADD CONSTRAINT "DashboardProdutividadeCenter_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_demanda" ADD CONSTRAINT "devolucao_demanda_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_demanda" ADD CONSTRAINT "devolucao_demanda_adicionadoPorId_fkey" FOREIGN KEY ("adicionadoPorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_demanda" ADD CONSTRAINT "devolucao_demanda_conferenteId_fkey" FOREIGN KEY ("conferenteId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_historico_status" ADD CONSTRAINT "devolucao_historico_status_devolucaoDemandaId_fkey" FOREIGN KEY ("devolucaoDemandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_historico_status" ADD CONSTRAINT "devolucao_historico_status_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_notas" ADD CONSTRAINT "devolucao_notas_devolucaoDemandaId_fkey" FOREIGN KEY ("devolucaoDemandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_itens" ADD CONSTRAINT "devolucao_itens_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_anomalias" ADD CONSTRAINT "devolucao_anomalias_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_transportadoras" ADD CONSTRAINT "devolucao_transportadoras_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_check_list" ADD CONSTRAINT "devolucao_check_list_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DevolucaImagens" ADD CONSTRAINT "DevolucaImagens_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rules_engines" ADD CONSTRAINT "rules_engines_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE RESTRICT ON UPDATE CASCADE;

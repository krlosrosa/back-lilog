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

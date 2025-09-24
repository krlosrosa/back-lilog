-- CreateEnum
CREATE TYPE "public"."TipoPeso" AS ENUM ('PVAR', 'PPAR');

-- CreateEnum
CREATE TYPE "public"."SegmentoProduto" AS ENUM ('SECO', 'REFR');

-- CreateTable
CREATE TABLE "public"."produto" (
    "id" TEXT NOT NULL,
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

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

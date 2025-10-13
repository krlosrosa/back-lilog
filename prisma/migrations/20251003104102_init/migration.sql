-- CreateTable
CREATE TABLE "public"."DevolucaImagens" (
    "id" SERIAL NOT NULL,
    "demandaId" INTEGER NOT NULL,
    "processo" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "DevolucaImagens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."DevolucaImagens" ADD CONSTRAINT "DevolucaImagens_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

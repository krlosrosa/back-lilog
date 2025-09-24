/*
  Warnings:

  - You are about to drop the column `nomeTransportadora` on the `devolucao_demanda` table. All the data in the column will be lost.
  - The primary key for the `devolucao_transportadoras` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[nome,centerId]` on the table `devolucao_transportadoras` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `centerId` to the `devolucao_transportadoras` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."devolucao_demanda" DROP CONSTRAINT "devolucao_demanda_nomeTransportadora_fkey";

-- AlterTable
ALTER TABLE "public"."devolucao_demanda" DROP COLUMN "nomeTransportadora",
ADD COLUMN     "idTransportadora" INTEGER;

-- AlterTable
ALTER TABLE "public"."devolucao_transportadoras" DROP CONSTRAINT "devolucao_transportadoras_pkey",
ADD COLUMN     "centerId" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "devolucao_transportadoras_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "devolucao_transportadoras_nome_centerId_key" ON "public"."devolucao_transportadoras"("nome", "centerId");

-- AddForeignKey
ALTER TABLE "public"."devolucao_demanda" ADD CONSTRAINT "devolucao_demanda_idTransportadora_fkey" FOREIGN KEY ("idTransportadora") REFERENCES "public"."devolucao_transportadoras"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_transportadoras" ADD CONSTRAINT "devolucao_transportadoras_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE RESTRICT ON UPDATE CASCADE;

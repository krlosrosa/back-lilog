/*
  Warnings:

  - Added the required column `turno` to the `DashboardProdutividadeUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."DashboardProdutividadeUser" ADD COLUMN     "turno" "public"."Turno" NOT NULL;

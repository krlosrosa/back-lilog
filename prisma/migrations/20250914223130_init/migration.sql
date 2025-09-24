-- DropForeignKey
ALTER TABLE "public"."devolucao_check_list" DROP CONSTRAINT "devolucao_check_list_demandaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."devolucao_historico_status" DROP CONSTRAINT "devolucao_historico_status_devolucaoDemandaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."devolucao_itens" DROP CONSTRAINT "devolucao_itens_demandaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."devolucao_notas" DROP CONSTRAINT "devolucao_notas_devolucaoDemandaId_fkey";

-- AddForeignKey
ALTER TABLE "public"."devolucao_historico_status" ADD CONSTRAINT "devolucao_historico_status_devolucaoDemandaId_fkey" FOREIGN KEY ("devolucaoDemandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_notas" ADD CONSTRAINT "devolucao_notas_devolucaoDemandaId_fkey" FOREIGN KEY ("devolucaoDemandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_itens" ADD CONSTRAINT "devolucao_itens_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."devolucao_check_list" ADD CONSTRAINT "devolucao_check_list_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "public"."devolucao_demanda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

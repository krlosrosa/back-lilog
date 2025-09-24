/*
  Warnings:

  - The primary key for the `produto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `produto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."produto" DROP CONSTRAINT "produto_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "produto_pkey" PRIMARY KEY ("sku");

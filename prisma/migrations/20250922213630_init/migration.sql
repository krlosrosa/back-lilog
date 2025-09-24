/*
  Warnings:

  - You are about to drop the column `event` on the `rules_engines` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `rules_engines` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `rules_engines` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."rules_engines_centerId_enabled_priority_idx";

-- AlterTable
ALTER TABLE "public"."rules_engines" DROP COLUMN "event",
DROP COLUMN "priority",
DROP COLUMN "tags";

-- CreateIndex
CREATE INDEX "rules_engines_centerId_enabled_idx" ON "public"."rules_engines"("centerId", "enabled");

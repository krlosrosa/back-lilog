-- CreateTable
CREATE TABLE "public"."rules_engines" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "centerId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "conditions" JSONB NOT NULL,
    "event" JSONB NOT NULL,
    "tags" TEXT[],
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rules_engines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "rules_engines_centerId_enabled_priority_idx" ON "public"."rules_engines"("centerId", "enabled", "priority");

-- CreateIndex
CREATE UNIQUE INDEX "rules_engines_name_centerId_key" ON "public"."rules_engines"("name", "centerId");

-- AddForeignKey
ALTER TABLE "public"."rules_engines" ADD CONSTRAINT "rules_engines_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."Center"("centerId") ON DELETE RESTRICT ON UPDATE CASCADE;

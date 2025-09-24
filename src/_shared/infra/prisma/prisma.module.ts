// prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // <- Torna o módulo global
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // <- Exporta para que outros módulos possam usar
})
export class PrismaModule {}

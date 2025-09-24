import { Module } from '@nestjs/common';
import { TesteService } from './teste.service';
import { TesteResolver } from './teste.resolver';

@Module({
  providers: [TesteResolver, TesteService],
})
export class TesteModule {}

import { Inject, Injectable } from '@nestjs/common';
import { type IPwaRepository } from '../domain/repository/IPwa.repository';
import { SalvarImagensBancoZodDto } from '../dtos/salvarImagensBanco.dto';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class SalvarImagensBancoUsecase {
  constructor(
    @Inject('IPwaRepository')
    private readonly pwaRepository: IPwaRepository,
  ) {}
  @OnEvent('salvarImagensBanco')
  async execute(command: SalvarImagensBancoZodDto[]) {
    return this.pwaRepository.salvarImagensBanco(command);
  }
}

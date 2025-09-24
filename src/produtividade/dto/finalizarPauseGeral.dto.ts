import { ApiProperty } from '@nestjs/swagger';
import { Processo, Turno } from '../enums/produtividade.enums';

export class FinalizarPauseGeralDto {
  @ApiProperty({
    description: 'ID do centro que está sendo pausado',
    example: '123',
  })
  centerId: string;

  @ApiProperty({
    description: 'Turno da pausa geral',
    example: 'MANHA',
  })
  turno: Turno;

  @ApiProperty({
    description: 'Processo da pausa geral',
    example: 'SEPARACAO',
  })
  processo: Processo;

  @ApiProperty({
    description: 'Segmento da pausa geral',
    example: '123',
  })
  segmento: string;
}

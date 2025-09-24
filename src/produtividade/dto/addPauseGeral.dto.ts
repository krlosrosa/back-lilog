import { ApiProperty } from '@nestjs/swagger';
import { Processo, Turno } from '../enums/produtividade.enums';

export class AddPauseGeralDto {
  @ApiProperty({
    description: 'ID do usuário que está cadastrando a pausa geral',
    example: '123',
  })
  cadastradoPorId: string;

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

  @ApiProperty({
    description: 'Motivo da pausa geral',
    example: '123',
  })
  motivo: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { TipoProcesso } from '../enums/produtividade.enums';

export class CreateProdutividadeDto {
  @ApiProperty({
    description: 'Data e hora de início da demanda',
    example: '2025-01-01T00:00:00.000Z',
  })
  inicio: Date;

  @ApiProperty({
    description: 'Processo que está sendo iniciado',
    example: 'SEPARACAO',
  })
  processo: TipoProcesso;

  @ApiProperty({
    description: 'ID do funcionário que está iniciando o picking',
    example: '123',
  })
  funcionarioId: string;

  @ApiProperty({
    description: 'IDs das paletes que estão sendo iniciadas',
    example: ['123', '456'],
  })
  paletesIds: string[];

  @ApiProperty({
    description: 'ID do centro que está iniciando o picking',
    example: '123',
  })
  centerId: string;

  @ApiProperty({
    description: 'Turno que está iniciando o picking',
    example: 'MANHA',
  })
  turno: 'MANHA' | 'TARDE' | 'NOITE';

  @ApiProperty({
    description: 'Observação do picking',
    example: 'Observação',
  })
  obs?: string;
}

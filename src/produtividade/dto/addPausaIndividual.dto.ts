import { ApiProperty } from '@nestjs/swagger';

export class AddPausaIndividualDto {
  @ApiProperty({
    description: 'ID do pallet que está sendo pausado',
    example: '123',
  })
  paleteId: string;

  @ApiProperty({
    description: 'Motivo da pausa',
    example: 'Motivo',
  })
  motivo: string;

  @ApiProperty({
    description: 'Descrição da pausa',
    example: 'Descrição',
  })
  descricao?: string;
}

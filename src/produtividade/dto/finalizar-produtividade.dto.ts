import { ApiProperty } from '@nestjs/swagger';

export class FinalizarProdutividadeDto {
  @ApiProperty({
    description: 'Observação da finalização',
    example: 'Observação',
  })
  observacao?: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class CriarNovoCentroDto {
  @ApiProperty({
    description: 'ID do centro',
    example: 'center-123',
  })
  centerId: string;

  @ApiProperty({
    description: 'Descrição do centro',
    example: 'CD São Paulo',
  })
  description: string;

  @ApiProperty({
    description: 'Estado do centro',
    example: 'SP',
  })
  state: string;

  @ApiProperty({
    description: 'Cluster do centro',
    example: 'distribuicao',
    default: 'distribuicao',
  })
  cluster: string;
}

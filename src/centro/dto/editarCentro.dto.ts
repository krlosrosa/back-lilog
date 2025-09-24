import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CriarNovoCentroDto } from './criarNovoCentro.dto';

export class EditarCentroDto extends PartialType(CriarNovoCentroDto) {
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

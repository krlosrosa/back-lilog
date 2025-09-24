import { DefinirConfiguracaoImpressaoDto } from 'src/centro/dto/definirConfiguracaoCentro.dto';
import { CriarNovoCentroZodDto } from 'src/centro/dto/criarNovoCentro.schema';
import { EditarCentroDto } from 'src/centro/dto/editarCentro.dto';

export interface ICenterRepository {
  buscarConfiguracoesPorCentro(
    centerId: string,
  ): Promise<Omit<DefinirConfiguracaoImpressaoDto, 'id'>>;
  create(center: CriarNovoCentroZodDto): Promise<CriarNovoCentroZodDto>;
  edit(center: EditarCentroDto, centerId: string): Promise<boolean>;
  delete(centerId: string): Promise<boolean>;
  definirConfiguracaoImpressao(
    configuracao: DefinirConfiguracaoImpressaoDto,
    centerId: string,
    atribuidoPorId: string,
  ): Promise<boolean>;
  findAll(): Promise<CriarNovoCentroZodDto[]>;
}

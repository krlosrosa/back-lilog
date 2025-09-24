import { RavexResponseDto } from '../../dtos/ravex/infoAnomalia.dto';
import { RavexResponseViagemDtoResponse } from '../../dtos/ravex/infoViagem.dto';
import { TokenRavexDto } from '../../dtos/ravex/tokenRavex.dto';

export interface IRavexRepository {
  getRavexByViagemId(
    viagemId: string,
    token: string,
  ): Promise<RavexResponseDto | undefined>;
  authRavex(login: string, senha: string): Promise<TokenRavexDto | undefined>;
  getRavexViagemId(
    viagemId: string,
    token: string,
  ): Promise<RavexResponseViagemDtoResponse | undefined>;
}

import { PaleteEntity } from '../entities/palete.entity';

export interface IPaleteRepository {
  findByIds(ids: string[]): Promise<PaleteEntity[]>;
}

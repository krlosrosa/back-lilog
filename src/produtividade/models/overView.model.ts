import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { TipoProcesso } from '../enums/produtividade.enums';

@ObjectType()
export class OverViewModel {
  @Field(() => Number)
  processos: number;

  @Field(() => Number)
  emAndamento: number;

  @Field(() => Number)
  concluidos: number;

  @Field(() => Number)
  totalCaixas: number;

  @Field(() => Number)
  totalUnidades: number;

  @Field(() => Number)
  produtividade: number;
}

@InputType()
export class InputOverViewModelGraph {
  @Field()
  centerId: string;

  @Field()
  data: string;

  @Field()
  processo: TipoProcesso;

  @Field()
  segmento: string;
}

import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class InputTransporteModel {
  @Field(() => String)
  centerId: string;

  @Field(() => String)
  data: string;
}

@ObjectType()
export class OutputTransporteModel {
  @Field(() => Number)
  naoIniciado: number;

  @Field(() => Number)
  emSeparacao: number;

  @Field(() => Number)
  emConferencia: number;

  @Field(() => Number)
  emCarregamento: number;

  @Field(() => Number)
  carregamentoConcluido: number;

  @Field(() => Number)
  faturado: number;
}

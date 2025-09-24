import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class AuthorizationModelInput {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  centerId: string;
}

@ObjectType()
export class AuthorizationModel {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  processo: string;

  @Field(() => String)
  role: string;
}

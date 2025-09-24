import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import {
  AuthorizationModel,
  AuthorizationModelInput,
} from './model/authorization.model';
import { Inject } from '@nestjs/common';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  @Query(() => [AuthorizationModel])
  async listarPermissoesParaCasl(
    @Context() context,
    @Args('authorizationModelInput')
    authorizationModelInput: AuthorizationModelInput,
  ): Promise<AuthorizationModel[]> {
    const authorizationList = await this.userService.listarPermissoesParaCasl(
      authorizationModelInput.userId,
      authorizationModelInput.centerId,
    );

    return authorizationList.map((authorization) => ({
      processo: authorization.processo,
      role: authorization.role,
      userId: authorization.id,
    }));
  }
}

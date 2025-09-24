// Exemplo em /application/ports/IAuthService.ts
export interface AuthenticatedUser {
  id: string;
  email: string;
  roles: string[];
}

export interface IAuthService {
  validateToken: (token: string) => Promise<AuthenticatedUser>;
}

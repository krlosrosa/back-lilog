// src/common/types/express.d.ts

// Importe a interface que você criou
import { UserPayload } from '../interfaces/user-payload.interface';

// Este é o truque: estamos adicionando a propriedade 'user' à interface Request do Express
declare global {
  namespace Express {
    export interface Request {
      // Usamos '?' para indicar que a propriedade é opcional,
      // pois ela só existirá em rotas autenticadas.
      user?: UserPayload;
    }
  }
}

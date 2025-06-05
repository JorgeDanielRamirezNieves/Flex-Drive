import { sign, verify } from 'jsonwebtoken';
import { User } from 'src/user/models/user';

export class Token {
  public static processAnswer(respuesta: User): string {
    if (!respuesta.uuid || respuesta.uuid.trim() === '') {
      throw new Error('UUID inválido al generar el token');
    }
    let token = '';

    token = sign(
      {
        rolUser: respuesta.rolUser,
        firstName: respuesta.firstName,
        lastName: respuesta.lastName,
        uuid: respuesta.uuid,
        email: respuesta.email,
      },
      String(process.env.SECRET_PASSWORD),
      { expiresIn: '8h' },
    );

    return token;
  }

  public static verifyToken(token: string): any {
    if (!token || token.trim() === '') {
      throw new Error('Token inválido');
    }
    try {
      const decoded = verify(token, String(process.env.SECRET_PASSWORD));
      return decoded;
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Login } from './models/login';
import { User } from 'src/user/models/user';
import { compareSync } from 'bcryptjs';
import { Token } from 'src/core/tokes';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(login: Login) {
    const existe = await this.userRepository.findBy({ email: login.email, status: 'active' });
    if (existe.length !== 0) {
      const userFromDB = existe[0];
      const Password = userFromDB.password;
      const Email = userFromDB.email;

      if (compareSync(login.password, Password)) {
        try {
          const datosUsuario: any = (await this.userRepository.findOne({
            where: { email: Email },
            relations: ['rolUser', 'typeDocumentUser'],
          })) as User;

          const token = Token.processAnswer(datosUsuario);

          let loginEntity = await this.loginRepository.findOne({
            where: { idUser: userFromDB.uuid },
          });

          if (loginEntity) {
            // Si ya existe, actualiza solo la fecha
            loginEntity.login_date = new Date();
            await this.loginRepository.save(loginEntity);
          } else {
            // Si no existe, crea un nuevo registro
            loginEntity = this.loginRepository.create({
              idUser: userFromDB.uuid,
              email: userFromDB.email,
              password: '',
              login_date: new Date(),
              isActive: true,
            });
            await this.loginRepository.save(loginEntity);
          }

          return new HttpException(
            { tokenApp: token, rolUser: datosUsuario.rolUser.name },
            200,
          );
        } catch (error) {
          throw new HttpException(
            'Fallo en la verificación del usuario: ' + error,
            400,
          );
        }
      } else {
        return new HttpException('La contraseña es incorrecta', 406);
      }
    } else {
      return new HttpException('No existe el usuario', 409);
    }
  }

  public async changeEmail(
    userId: string, email: string
  ): Promise<void> {
    const user = await this.userRepository.findOneBy({ uuid: userId });
    if (!user) {
      throw new HttpException('Usuario no encontrado', 404);
    }
    user.email = email;
    await this.userRepository.save(user);
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../models/user';

@Injectable()
export class UserService {
  public UserRepository: Repository<User>;
  constructor(poolConexion: DataSource) {
    this.UserRepository = poolConexion.getRepository(User);
  }

  // Métodos privados
  public async listUsers(): Promise<User[]> {
    return this.UserRepository.find({
      order: { firstName: 'ASC' },
      relations: ['rolUser', 'typeDocumentUser'],
      select: {
        typeDocumentUser: { name: true },
        rolUser: { name: true },
      },
    });
  }

  public async getUsersByUUID(uuid: string): Promise<User | null> {
    return this.UserRepository.findOne({
      where: { uuid: uuid },
      relations: ['rolUser', 'typeDocumentUser'],
      select: {
        typeDocumentUser: { name: true },
        rolUser: { name: true },
      },
    });
  }

  public async createUser(objUser: User): Promise<User | HttpException> {
    return this.UserRepository.save(objUser)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return new HttpException(`Error creating User: ${error}`, 500);
      });
  }

  public async updateUser(
    uuid: string,
    objUser: User,
  ): Promise<{ response: UpdateResult; User: User } | HttpException> {
    return this.UserRepository.update(uuid, objUser)
      .then((response) => {
        return new HttpException(
          JSON.stringify({ response: response, User: objUser }),
          200,
        );
      })
      .catch((error) => {
        return new HttpException(`Error updating User: ${error}`, 500);
      });
  }

  public async deleteUser(uuid: string): Promise<DeleteResult> {
    return this.UserRepository.delete(uuid);
  }
}

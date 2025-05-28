import { HttpException, Injectable } from '@nestjs/common';
import { Chat } from '../models/chat';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ChatService {
  public ChatRepository: Repository<Chat>;
  constructor(poolConexion: DataSource) {
    this.ChatRepository = poolConexion.getRepository(Chat);
  }

  // Métodos privados
  public async listChats(): Promise<Chat[]> {
    return this.ChatRepository.find();
  }

  public async getChatsByUUID(uuid: string): Promise<Chat | null> {
    return this.ChatRepository.findOne({ where: { uuid: uuid } });
  }

  public async getChatsByuserUUID(useruuid: string): Promise<Chat[] | null> {
    return this.ChatRepository.createQueryBuilder('c')
      .leftJoinAndSelect('c.request', 'r')
      .leftJoinAndSelect('c.chatMessage', 'm')
      .leftJoinAndSelect('r.requestVehicle', 'v') // Asumiendo que tienes la relación configurada
      .leftJoinAndSelect('v.ownerVehicle', 'owner')
      .leftJoinAndSelect('r.requestUser', 'u') // Asumiendo que tienes la relación configurada
      .where('m.idSender = :useruuid', { useruuid: useruuid })
      .getMany();
  }

  public async createChat(objChat: Chat): Promise<Chat | HttpException> {
    return this.ChatRepository.save(objChat)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return new HttpException(`Error creating Chat: ${error}`, 500);
      });
  }

  public async updateChat(
    uuid: string,
    objChat: Chat,
  ): Promise<{ response: UpdateResult; Chat: Chat } | HttpException> {
    return this.ChatRepository.update(uuid, objChat)
      .then((response) => {
        return new HttpException(
          JSON.stringify({ response: response, Chat: objChat }),
          200,
        );
      })
      .catch((error) => {
        return new HttpException(`Error updating Chat: ${error}`, 500);
      });
  }

  public async deleteChat(uuid: string): Promise<DeleteResult> {
    return this.ChatRepository.delete(uuid);
  }
}

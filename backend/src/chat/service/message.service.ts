import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Message } from '../models/message';

@Injectable()
export class MessageService {
  public MessageRepository: Repository<Message>;
  constructor(poolConexion: DataSource) {
    this.MessageRepository = poolConexion.getRepository(Message);
  }

  // Métodos privados
  public async listMessages(): Promise<Message[]> {
    return this.MessageRepository.find({});
  }

  public async getMessagesByUUID(uuid: string): Promise<Message | null> {
    return this.MessageRepository.findOne({
      where: { uuid: uuid },
    });
  }

  public async createMessage(
    objMessage: Message,
  ): Promise<Message | HttpException> {
    return this.MessageRepository.save(objMessage)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return new HttpException(`Error creating Message: ${error}`, 500);
      });
  }

  public async changeStatusMessage(obj: {
    uuid: string;
    status: boolean;
  }): Promise<UpdateResult | HttpException> {
    return this.MessageRepository.update(obj.uuid, {
      status: obj.status,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return new HttpException(`Error updating Message: ${error}`, 500);
      });
  }

  public async changeDescriptionMessage(obj: {
    uuid: string;
    description: string;
  }): Promise<UpdateResult | HttpException> {
    return this.MessageRepository.update(obj.uuid, {
      description: obj.description,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return new HttpException(`Error updating Message: ${error}`, 500);
      });
  }

  public async deleteMessage(uuid: string): Promise<DeleteResult> {
    return this.MessageRepository.delete(uuid);
  }
}

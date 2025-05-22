import { User } from './../user/models/user';
import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Request } from './models/request';
import { Vehicle } from './../vehicle/models/vehicle';

@Injectable()
export class RequestsService {
  public RequestRepository: Repository<Request>;
  public UserRepository: Repository<User>;
  public vehicleRepository: Repository<Vehicle>;
  constructor(poolConexion: DataSource) {
    this.RequestRepository = poolConexion.getRepository(Request);
    this.UserRepository = poolConexion.getRepository(User);
    this.vehicleRepository = poolConexion.getRepository(Vehicle);
  }

  // Métodos privados
  public async listRequests(): Promise<Request[]> {
    return this.RequestRepository.find();
  }

  public async getRequestByUUID(uuid: string): Promise<Request | null> {
    return this.RequestRepository.findOne({ where: { uuid: uuid } });
  }

  public async getRequestByClientUUID(
    uuidClient: string,
  ): Promise<Request[] | null> {
    return await this.RequestRepository.createQueryBuilder('r')
    .leftJoinAndSelect('r.requestVehicle', 'v') // Asumiendo que tienes la relación configurada
    .leftJoinAndSelect('v.ownerVehicle', 'owner')
    .leftJoinAndSelect('v.detailsVehicle', 'details')
    .leftJoinAndSelect('v.prices', 'prices')
    .leftJoinAndSelect('v.typeSaleVehicle', 'typeSale')
    .leftJoinAndSelect('r.requestUser', 'client') // Asumiendo que tienes la relación configurada
    .leftJoinAndSelect('client.typeDocumentUser', 'typeDoc')
    .where('client.uuid = :uuidClient', { uuidClient })
    .getMany();
  }
  
  public async getRequestByOwnerUUID(
    uuidOwner: string,
  ): Promise<Request[] | null> {
    return await this.RequestRepository.createQueryBuilder('r')
    .leftJoinAndSelect('r.requestVehicle', 'v') // Asumiendo que tienes la relación configurada
    .leftJoinAndSelect('v.ownerVehicle', 'owner')
    .leftJoinAndSelect('v.detailsVehicle', 'details')
    .leftJoinAndSelect('v.prices', 'prices')
    .leftJoinAndSelect('v.typeSaleVehicle', 'typeSale')
    .leftJoinAndSelect('r.requestUser', 'client') // Asumiendo que tienes la relación configurada
    .leftJoinAndSelect('client.typeDocumentUser', 'typeDoc')
    .where('owner.uuid = :uuidOwner', { uuidOwner })
    .getMany();
  }

  public async createRequest(
    objRequest: Request,
  ): Promise<Request | HttpException> {
    return this.RequestRepository.save(objRequest)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return new HttpException(`Error creating Requests: ${error}`, 500);
      });
  }

  public async updateRequest(
    uuid: string,
    objRequest: Request,
  ): Promise<{ response: UpdateResult; Requests: Request } | HttpException> {
    return this.RequestRepository.update(uuid, objRequest)
      .then((response) => {
        return new HttpException(
          JSON.stringify({ response: response, Requests: objRequest }),
          200,
        );
      })
      .catch((error) => {
        return new HttpException(`Error updating Requests: ${error}`, 500);
      });
  }

  public async deleteRequest(uuid: string): Promise<DeleteResult> {
    return this.RequestRepository.delete(uuid);
  }
}

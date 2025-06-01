import { HttpException, Injectable } from '@nestjs/common';
import { ServiceRent } from './models/serviceRent';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ServicesRentService {
  public ServiceRentRepository: Repository<ServiceRent>;
  constructor(poolConexion: DataSource) {
    this.ServiceRentRepository = poolConexion.getRepository(ServiceRent);
  }

  // Métodos privados
  public async listServiceRents(): Promise<ServiceRent[]> {
    return this.ServiceRentRepository.find({
      relations: ['request'],
    });
  }

  public async getServiceRentsByUUID(
    uuid: string,
  ): Promise<ServiceRent | null> {
    return this.ServiceRentRepository.createQueryBuilder('s')
      .innerJoinAndSelect('s.request', 'r')
      .leftJoinAndSelect('r.requestVehicle', 'v') // Asumiendo que tienes la relación configurada
      .leftJoinAndSelect('v.ownerVehicle', 'owner')
      .leftJoinAndSelect('v.detailsVehicle', 'details')
      .leftJoinAndSelect('v.prices', 'prices')
      .leftJoinAndSelect('v.typeSaleVehicle', 'typeSale')
      .leftJoinAndSelect('v.soatVehicle', 'soat')
      .leftJoinAndSelect('v.TecnomecanicVehicle', 'tecnomecanic')
      .leftJoinAndSelect('r.requestUser', 'client') // Asumiendo que tienes la relación configurada
      .leftJoinAndSelect('client.typeDocumentUser', 'typeDoc')
      .leftJoinAndSelect('client.userFines', 'fines')
      .leftJoinAndSelect('owner.typeDocumentUser', 'typeDocOwner')
      .leftJoinAndSelect('owner.userFines', 'finesOwner')
      .where('s.uuid = :uuid', { uuid: uuid })
      .getOne();
  }

  public async getServiceRentsByUUIIDClient(
    uuid: string,
  ): Promise<ServiceRent[] | null> {
    return this.ServiceRentRepository.createQueryBuilder('s')
      .innerJoinAndSelect('s.request', 'r')
      .leftJoinAndSelect('r.requestVehicle', 'v') // Asumiendo que tienes la relación configurada
      .leftJoinAndSelect('v.ownerVehicle', 'owner')
      .leftJoinAndSelect('v.detailsVehicle', 'details')
      .leftJoinAndSelect('v.prices', 'prices')
      .leftJoinAndSelect('v.typeSaleVehicle', 'typeSale')
      .leftJoinAndSelect('r.requestUser', 'client') // Asumiendo que tienes la relación configurada
      .leftJoinAndSelect('client.typeDocumentUser', 'typeDoc')
      .leftJoinAndSelect('owner.typeDocumentUser', 'typeDocOwner')
      .where('r.requestUser = :uuid', { uuid: uuid })
      .orWhere('v.idOwner = :uuid', { uuid: uuid })
      .getMany();
  }

  public async createServiceRent(
    objServiceRent: ServiceRent,
  ): Promise<ServiceRent | HttpException> {
    return this.ServiceRentRepository.save(objServiceRent)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return new HttpException(`Error creating ServiceRent: ${error}`, 500);
      });
  }

  public async changeSatusServiceRent(objStatus: {
    uuid: string;
    status: 'for_take' | 'on_travel' | 'reported' | 'for_recive' | 'finished';
  }): Promise<
    { response: UpdateResult; ServiceRent: ServiceRent } | HttpException
  > {
    return this.ServiceRentRepository.update(objStatus.uuid, {
      status: objStatus.status,
    })
      .then((response) => {
        return new HttpException(
          JSON.stringify({ response: response, ServiceRent: objStatus }),
          200,
        );
      })
      .catch((error) => {
        return new HttpException(`Error updating ServiceRent: ${error}`, 500);
      });
  }

  public async deleteServiceRent(uuid: string): Promise<DeleteResult> {
    return this.ServiceRentRepository.delete(uuid);
  }

  
}

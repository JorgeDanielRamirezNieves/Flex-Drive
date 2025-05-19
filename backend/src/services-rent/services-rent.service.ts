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
    
      public async getServiceRentsByUUID(uuid: string): Promise<ServiceRent | null> {
        return this.ServiceRentRepository.findOne({ where: { uuid: uuid }, relations: ['request'] });
      }
    
      public async createServiceRent(objServiceRent: ServiceRent): Promise<ServiceRent | HttpException> {
        return this.ServiceRentRepository.save(objServiceRent)
          .then((response) => {
            return response;
          })
          .catch((error) => {
            return new HttpException(`Error creating ServiceRent: ${error}`, 500);
          });
      }
    
      public async updateServiceRent(
        uuid: string,
        objServiceRent: ServiceRent,
      ): Promise<{ response: UpdateResult; ServiceRent: ServiceRent } | HttpException> {
        return this.ServiceRentRepository.update(uuid, objServiceRent)
          .then((response) => {
            return new HttpException(
              JSON.stringify({ response: response, ServiceRent: objServiceRent }),
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

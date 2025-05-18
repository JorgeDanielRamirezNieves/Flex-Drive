import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TypeContract } from '../models/type-contract';

@Injectable()
export class TypeContractService {
    public TypeContractRepository: Repository<TypeContract>;
          constructor(poolConexion: DataSource) {
            this.TypeContractRepository = poolConexion.getRepository(TypeContract);
          }
        
          // Métodos privados
          public async listTypeContracts(): Promise<TypeContract[]> {
            return this.TypeContractRepository.find();
          }
        
          public async getTypeContractsByUUID(uuid: string): Promise<TypeContract | null> {
            return this.TypeContractRepository.findOne({ where: { uuid: uuid } });
          }
        
          public async createTypeContract(
            objTypeContract: TypeContract,
          ): Promise<TypeContract | HttpException> {
            return this.TypeContractRepository
              .save(objTypeContract)
              .then((response) => {
                return response;
              })
              .catch((error) => {
                return new HttpException(`Error creating type contract: ${error}`, 500);
              });
          }
        
          public async updateTypeContract(
            uuid: string,
            objTypeContract: TypeContract,
          ): Promise<{ response: UpdateResult; TypeContract: TypeContract } | HttpException> {
            return this.TypeContractRepository
              .update(uuid, objTypeContract)
              .then((response) => {
                return new HttpException(
                  JSON.stringify({ response: response, TypeContract: objTypeContract }),
                  200,
                );
              })
              .catch((error) => {
                return new HttpException(`Error updating type contract: ${error}`, 500);
              });
          }
        
          public async deleteTypeContract(uuid: string): Promise<DeleteResult> {
            return this.TypeContractRepository.delete(uuid);
          }
}

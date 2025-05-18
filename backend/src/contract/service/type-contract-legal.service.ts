import { HttpException, Injectable } from '@nestjs/common';
import { TypeContractLegal } from '../models/type-contract-legal';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TypeContractLegalService {
  public TypeContractLegalRepository: Repository<TypeContractLegal>;
  constructor(poolConexion: DataSource) {
    this.TypeContractLegalRepository =
      poolConexion.getRepository(TypeContractLegal);
  }

  // Métodos privados
  public async listTypeContractLegals(): Promise<TypeContractLegal[]> {
    return this.TypeContractLegalRepository.find();
  }

  public async getTypeContractLegalsByUUID(
    uuid: string,
  ): Promise<TypeContractLegal | null> {
    return this.TypeContractLegalRepository.findOne({ where: { uuid: uuid } });
  }

  public async createTypeContractLegal(
    objTypeContractLegal: TypeContractLegal,
  ): Promise<TypeContractLegal | HttpException> {
    return this.TypeContractLegalRepository.save(objTypeContractLegal)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return new HttpException(
          `Error creating type contract legal: ${error}`,
          500,
        );
      });
  }

  public async updateTypeContractLegal(
    uuid: string,
    objTypeContractLegal: TypeContractLegal,
  ): Promise<
    | { response: UpdateResult; TypeContractLegal: TypeContractLegal }
    | HttpException
  > {
    return this.TypeContractLegalRepository.update(uuid, objTypeContractLegal)
      .then((response) => {
        return new HttpException(
          JSON.stringify({
            response: response,
            TypeContractLegal: objTypeContractLegal,
          }),
          200,
        );
      })
      .catch((error) => {
        return new HttpException(
          `Error updating type contract legal: ${error}`,
          500,
        );
      });
  }

  public async deleteTypeContractLegal(uuid: string): Promise<DeleteResult> {
    return this.TypeContractLegalRepository.delete(uuid);
  }
}

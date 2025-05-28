import { HttpException, Injectable } from '@nestjs/common';
import { Contract } from '../models/contract';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ContractService {
  public ContractRepository: Repository<Contract>;
  constructor(poolConexion: DataSource) {
    this.ContractRepository = poolConexion.getRepository(Contract);
  }

  // Métodos privados
  public async listContracts(): Promise<Contract[]> {
    return this.ContractRepository.find({
      relations: ['typeContractByContract', 'typeContractLegalByContract'],
      select: {
        typeContractByContract: {
          name: true,
        },
        typeContractLegalByContract: {
          name: true,
        },
      },
    });
  }

  public async getContractsByUUID(uuid: string): Promise<Contract | null> {
    return this.ContractRepository.findOne({
      where: { uuid: uuid },
    });
  }

  public async createContract(
    objContract: Contract,
  ): Promise<Contract | HttpException> {
    return this.ContractRepository.save(objContract)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return new HttpException(`Error creating Contract: ${error}`, 500);
      });
  }

  public async updateContract(
    uuid: string,
    objContract: Contract,
  ): Promise<{ response: UpdateResult; Contract: Contract } | HttpException> {
    return this.ContractRepository.update(uuid, objContract)
      .then((response) => {
        return new HttpException(
          JSON.stringify({ response: response, Contract: objContract }),
          200,
        );
      })
      .catch((error) => {
        return new HttpException(`Error updating Contract: ${error}`, 500);
      });
  }

  public async deleteContract(uuid: string): Promise<DeleteResult> {
    return this.ContractRepository.delete(uuid);
  }
}

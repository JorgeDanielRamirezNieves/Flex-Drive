import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TypeSale } from '../models/type_sale';

@Injectable()
export class TypeSaleService {
  public typeSaleRepository: Repository<TypeSale>;
  constructor(poolConexion: DataSource) {
    this.typeSaleRepository = poolConexion.getRepository(TypeSale);
  }

  // Métodos privados
  public async listTypeSales(): Promise<TypeSale[]> {
    return this.typeSaleRepository.find();
  }

  public async getTypeSalesByUUID(uuid: string): Promise<TypeSale | null> {
    return this.typeSaleRepository.findOne({ where: { uuid: uuid } });
  }

  public async createTypeSale(
    objTypeSale: TypeSale,
  ): Promise<TypeSale | HttpException> {
    return this.typeSaleRepository
      .save(objTypeSale)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return new HttpException(`Error creating type sale: ${error}`, 500);
      });
  }

  public async updateTypeSale(
    uuid: string,
    objTypeSale: TypeSale,
  ): Promise<{ response: UpdateResult; typeSale: TypeSale } | HttpException> {
    return this.typeSaleRepository
      .update(uuid, objTypeSale)
      .then((response) => {
        return new HttpException(
          JSON.stringify({ response: response, typeSale: objTypeSale }),
          200,
        );
      })
      .catch((error) => {
        return new HttpException(`Error updating type sale: ${error}`, 500);
      });
  }

  public async deleteTypeSale(uuid: string): Promise<DeleteResult> {
    return this.typeSaleRepository.delete(uuid);
  }
}

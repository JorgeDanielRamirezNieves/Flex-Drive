import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Price } from './models/price';

@Injectable()
export class PricesService {

    public PriceRepository: Repository<Price>;
    constructor(poolConexion: DataSource) {
        this.PriceRepository = poolConexion.getRepository(Price);
    }

    // Métodos privados
    public async listPrices(): Promise<Price[]> {
        return this.PriceRepository.find();
    }

    public async getPriceByUUID(uuid: string): Promise<Price | null> {
        return this.PriceRepository.findOne({ where: { uuid: uuid } });
    }

    public async createPrice(
        objPrice: Price,
    ): Promise<Price | HttpException> {
        return this.PriceRepository.save(objPrice)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return new HttpException(`Error creating Prices: ${error}`, 500);
            });
    }

    public async updatePrice(
        uuid: string,
        objPrice: Price,
    ): Promise<
        { response: UpdateResult; Prices: Price } | HttpException
    > {
        return this.PriceRepository.update(uuid, objPrice)
            .then((response) => {
                return new HttpException(
                    JSON.stringify({ response: response, Prices: objPrice }),
                    200,
                );
            })
            .catch((error) => {
                return new HttpException(`Error updating Prices: ${error}`, 500);
            });
    }

    public async deletePrice(uuid: string): Promise<DeleteResult> {
        return this.PriceRepository.delete(uuid);
    }

}

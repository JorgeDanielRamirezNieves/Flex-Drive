import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Request } from './models/request';

@Injectable()
export class RequestsService {

    public RequestRepository: Repository<Request>;
    constructor(poolConexion: DataSource) {
        this.RequestRepository = poolConexion.getRepository(Request);
    }

    // Métodos privados
    public async listRequests(): Promise<Request[]> {
        return this.RequestRepository.find();
    }

    public async getRequestByUUID(uuid: string): Promise<Request | null> {
        return this.RequestRepository.findOne({ where: { uuid: uuid } });
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
    ): Promise<
        { response: UpdateResult; Requests: Request } | HttpException
    > {
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

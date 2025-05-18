import { HttpException, Injectable } from '@nestjs/common';
import { TypeReport } from '../models/type-report';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TypeReportsService {
  public TypeReportRepository: Repository<TypeReport>;
  constructor(poolConexion: DataSource) {
    this.TypeReportRepository = poolConexion.getRepository(TypeReport);
  }

  // Métodos privados
  public async listTypeReports(): Promise<TypeReport[]> {
    return this.TypeReportRepository.find();
  }

  public async getTypeReportsByUUID(uuid: string): Promise<TypeReport | null> {
    return this.TypeReportRepository.findOne({ where: { uuid: uuid } });
  }

  public async createTypeReport(
    objTypeReport: TypeReport,
  ): Promise<TypeReport | HttpException> {
    return this.TypeReportRepository.save(objTypeReport)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return new HttpException(`Error creating TypeReport: ${error}`, 500);
      });
  }

  public async updateTypeReport(
    uuid: string,
    objTypeReport: TypeReport,
  ): Promise<
    { response: UpdateResult; TypeReport: TypeReport } | HttpException
  > {
    return this.TypeReportRepository.update(uuid, objTypeReport)
      .then((response) => {
        return new HttpException(
          JSON.stringify({ response: response, TypeReport: objTypeReport }),
          200,
        );
      })
      .catch((error) => {
        return new HttpException(`Error updating TypeReport: ${error}`, 500);
      });
  }

  public async deleteTypeReport(uuid: string): Promise<DeleteResult> {
    return this.TypeReportRepository.delete(uuid);
  }
}

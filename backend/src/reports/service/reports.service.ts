import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Reports } from '../models/reports';

@Injectable()
export class ReportsService {
  public ReportsRepository: Repository<Reports>;
  constructor(poolConexion: DataSource) {
    this.ReportsRepository = poolConexion.getRepository(Reports);
  }

  // Métodos privados
  public async listReports(): Promise<Reports[]> {
    return this.ReportsRepository.find({
      relations: ['typeReport'],
      select: {
        typeReport: {
          name: true,
        },
      },
    });
  }

  public async getReportsByUUID(uuid: string): Promise<Reports | null> {
    return this.ReportsRepository.findOne({
      where: { uuid: uuid },
      relations: ['typeReport'],
      select: {
        typeReport: {
          name: true,
        },
      },
    });
  }

  public async createReports(
    objReports: Reports,
  ): Promise<Reports | HttpException> {
    return this.ReportsRepository.save(objReports)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return new HttpException(`Error creating Reports: ${error}`, 500);
      });
  }

  public async updateReports(
    uuid: string,
    objReports: Reports,
  ): Promise<{ response: UpdateResult; Reports: Reports } | HttpException> {
    return this.ReportsRepository.update(uuid, objReports)
      .then((response) => {
        return new HttpException(
          JSON.stringify({ response: response, Reports: objReports }),
          200,
        );
      })
      .catch((error) => {
        return new HttpException(`Error updating Reports: ${error}`, 500);
      });
  }

  public async deleteReports(uuid: string): Promise<DeleteResult> {
    return this.ReportsRepository.delete(uuid);
  }
}

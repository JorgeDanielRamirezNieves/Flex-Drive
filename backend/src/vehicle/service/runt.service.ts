import { HttpException, Injectable } from '@nestjs/common';
import { Tecnomecanic } from '../models/tecnomecanic';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TecnicalDetails } from '../models/tecnical-details';
import { Soat } from '../models/soat';

@Injectable()
export class RuntService {
  public TecnomecanicRepository: Repository<Tecnomecanic>;
  public TecnicalDetailsRepository: Repository<TecnicalDetails>;
  public SoatRepository: Repository<Soat>;
  constructor(poolConexion: DataSource) {
    this.TecnomecanicRepository = poolConexion.getRepository(Tecnomecanic);
    this.SoatRepository = poolConexion.getRepository(Soat);
    this.TecnicalDetailsRepository =
      poolConexion.getRepository(TecnicalDetails);
  }

  // Métodos privados
  public async listTecnomecanics(): Promise<Tecnomecanic[]> {
    return this.TecnomecanicRepository.find();
  }

  public async getTecnomecanicsByNoCertificate(
    NoCertificate: string,
  ): Promise<Tecnomecanic | null> {
    return this.TecnomecanicRepository.findOne({
      where: { noCertificate: NoCertificate },
    });
  }

  public async createTecnomecanic(
    objTecnomecanic: Tecnomecanic,
  ): Promise<Tecnomecanic | HttpException> {
    return this.TecnomecanicRepository.save(objTecnomecanic)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return new HttpException(`Error creating Tecnomecanic: ${error}`, 500);
      });
  }

  public async updateTecnomecanic(
    uuid: string,
    objTecnomecanic: Tecnomecanic,
  ): Promise<
    { response: UpdateResult; Tecnomecanic: Tecnomecanic } | HttpException
  > {
    return this.TecnomecanicRepository.update(uuid, objTecnomecanic)
      .then((response) => {
        return new HttpException(
          JSON.stringify({ response: response, Tecnomecanic: objTecnomecanic }),
          200,
        );
      })
      .catch((error) => {
        return new HttpException(`Error updating Tecnomecanic: ${error}`, 500);
      });
  }

  public async deleteTecnomecanic(uuid: string): Promise<DeleteResult> {
    return this.TecnomecanicRepository.delete(uuid);
  }

  // methods of technical-details

  public async listTecnicalDetailss(): Promise<TecnicalDetails[]> {
    return this.TecnicalDetailsRepository.find();
  }

  public async getTecnicalDetailssByUUID(
    uuid: string,
  ): Promise<TecnicalDetails | null> {
    return this.TecnicalDetailsRepository.findOne({ where: { idDetails: uuid } });
  }

  public async createTecnicalDetails(
    objTecnicalDetails: TecnicalDetails,
  ): Promise<TecnicalDetails | HttpException> {
    return this.TecnicalDetailsRepository.save(objTecnicalDetails)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return new HttpException(
          `Error creating TecnicalDetails: ${error}`,
          500,
        );
      });
  }

  public async updateTecnicalDetails(
    uuid: string,
    objTecnicalDetails: TecnicalDetails,
  ): Promise<
    { response: UpdateResult; TecnicalDetails: TecnicalDetails } | HttpException
  > {
    return this.TecnicalDetailsRepository.update(uuid, objTecnicalDetails)
      .then((response) => {
        return new HttpException(
          JSON.stringify({
            response: response,
            TecnicalDetails: objTecnicalDetails,
          }),
          200,
        );
      })
      .catch((error) => {
        return new HttpException(
          `Error updating TecnicalDetails: ${error}`,
          500,
        );
      });
  }

  public async deleteTecnicalDetails(uuid: string): Promise<DeleteResult> {
    return this.TecnicalDetailsRepository.delete(uuid);
  }

  // methods of soat

  public async listSoats(): Promise<Soat[]> {
    return this.SoatRepository.find();
  }

  public async getSoatsByNoPolicy(noPolicy: string): Promise<Soat | null> {
    return this.SoatRepository.findOne({ where: { noPolicy: noPolicy } });
  }

  public async createSoat(objSoat: Soat): Promise<Soat | HttpException> {
    return this.SoatRepository.save(objSoat)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return new HttpException(`Error creating Soat: ${error}`, 500);
      });
  }

  public async updateSoat(
    uuid: string,
    objSoat: Soat,
  ): Promise<{ response: UpdateResult; Soat: Soat } | HttpException> {
    return this.SoatRepository.update(uuid, objSoat)
      .then((response) => {
        return new HttpException(
          JSON.stringify({ response: response, Soat: objSoat }),
          200,
        );
      })
      .catch((error) => {
        return new HttpException(`Error updating Soat: ${error}`, 500);
      });
  }

  public async deleteSoat(uuid: string): Promise<DeleteResult> {
    return this.SoatRepository.delete(uuid);
  }
}

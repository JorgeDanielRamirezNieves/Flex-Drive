import { TecnicalDetails } from 'src/vehicle/models/tecnical-details';
import { Tecnomecanic } from 'src/vehicle/models/tecnomecanic';
import { Soat } from 'src/vehicle/models/soat';
import { HttpException, Injectable } from '@nestjs/common';
import { Vehicle } from '../models/vehicle';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Price } from 'src/prices/models/price';

@Injectable()
export class VehicleService {
  public VehicleRepository: Repository<Vehicle>;
  public PricesRepository: Repository<Price>;
  public SoatRepository: Repository<Soat>;
  public TecnomecanicRepository: Repository<Tecnomecanic>;
  public TecnicalDetailsRepository: Repository<TecnicalDetails>;
  constructor(poolConexion: DataSource) {
    this.VehicleRepository = poolConexion.getRepository(Vehicle);
    this.PricesRepository = poolConexion.getRepository(Price);
    this.SoatRepository = poolConexion.getRepository(Soat);
    this.TecnomecanicRepository = poolConexion.getRepository(Tecnomecanic);
    this.TecnicalDetailsRepository = poolConexion.getRepository(
      TecnicalDetails,
    );
  }

  // Métodos privados
  public async listVehicles(): Promise<Vehicle[]> {
    return this.VehicleRepository.find({
      relations: [
        'typeSaleVehicle',
        'ownerVehicle',
        'prices',
        'detailsVehicle',
      ],
    });
  }

  public async getVehiclesByUUID(uuid: string): Promise<Vehicle | null> {
    return this.VehicleRepository.findOne({
      where: { uuid: uuid },
      relations: [
        'typeSaleVehicle',
        'ownerVehicle',
        'prices',
        'soatVehicle',
        'TecnomecanicVehicle',
        'detailsVehicle',
      ],  
    });
  }
  
  public async getVehiclesLimit(limit: number): Promise<Vehicle[] | null> {
    return this.VehicleRepository.find({
      relations: [
        'typeSaleVehicle',
        'ownerVehicle',
        'prices',
        'detailsVehicle',
      ],
      take: limit,
    });
  }
  public async getVehiclesMostRequest(limit: number): Promise<Vehicle[] | null> {
    return await this.VehicleRepository
    .createQueryBuilder('v')
    .leftJoinAndSelect('v.typeSaleVehicle', 'ts')
    .leftJoinAndSelect('v.detailsVehicle', 'd')
    .leftJoinAndSelect('v.prices', 'p')
    .leftJoin('requests', 'r', 'r.idVehicle = v.uuid')
    .groupBy('v.uuid') 
    .orderBy('COUNT(r.uuid)', 'DESC')
    .limit(limit)
    .getMany();
  }

  public async getVehiclesByUser(uuid: string): Promise<Vehicle[] | null> {
    return this.VehicleRepository.find({
      where: { ownerVehicle: { uuid: uuid } },
      relations: [
        'typeSaleVehicle',
        'ownerVehicle',
        'prices',
        'detailsVehicle',
      ],
    });
  }

  public async createVehicle(
    objVehicle: Vehicle,
  ): Promise<Vehicle | HttpException> {
    return this.VehicleRepository.save(objVehicle)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return new HttpException(`Error creating Vehicle: ${error}`, 500);
      });
  }

  public async updateVehicle(
    uuid: string,
    objVehicle: Vehicle,
  ): Promise<{ response: UpdateResult; Vehicle: Vehicle } | HttpException> {
    return this.VehicleRepository.update(uuid, objVehicle)
      .then((response) => {
        return new HttpException(
          JSON.stringify({ response: response, Vehicle: objVehicle }),
          200,
        );
      })
      .catch((error) => {
        return new HttpException(`Error updating Vehicle: ${error}`, 500);
      });
  }

  public async deleteVehicle(uuid: string): Promise<DeleteResult> {
    return this.VehicleRepository.delete(uuid);
  }
}

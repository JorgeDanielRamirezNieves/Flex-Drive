import { HttpException, Injectable } from '@nestjs/common';
import { Vehicle } from '../models/vehicle';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class VehicleService {
  public VehicleRepository: Repository<Vehicle>;
  constructor(poolConexion: DataSource) {
    this.VehicleRepository = poolConexion.getRepository(Vehicle);
  }

  // Métodos privados
  public async listVehicles(): Promise<Vehicle[]> {
    return this.VehicleRepository.find({
      relations: [
        'typeSaleVehicle',
        'ownerVehicle',
        'prices',
        'TecnomecanicVehicle',
        'soatVehicle',
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
        'TecnomecanicVehicle',
        'soatVehicle',
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

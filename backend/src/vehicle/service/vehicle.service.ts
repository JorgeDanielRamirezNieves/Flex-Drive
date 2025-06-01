import { Tecnomecanic } from './../models/tecnomecanic';
import { TecnicalDetails } from 'src/vehicle/models/tecnical-details';
import { Soat } from 'src/vehicle/models/soat';
import { HttpException, Injectable } from '@nestjs/common';
import { Vehicle } from '../models/vehicle';
import { DataSource, DeleteResult, Not, Repository, UpdateResult } from 'typeorm';
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
    this.TecnicalDetailsRepository =
      poolConexion.getRepository(TecnicalDetails);
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

  public async getVehiclesByPlate(plate: string): Promise<Vehicle | null> {
    return this.VehicleRepository.findOne({
      where: { plate: plate },
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
  public async getVehiclesMostRequest(
    limit: number,
  ): Promise<Vehicle[] | null> {
    return await this.VehicleRepository.createQueryBuilder('v')
      .leftJoinAndSelect('v.typeSaleVehicle', 'ts')
      .leftJoinAndSelect('v.detailsVehicle', 'd')
      .leftJoinAndSelect('v.prices', 'p')
      .leftJoin('requests', 'r', 'r.idVehicle = v.uuid')
      .groupBy('v.uuid, ts.uuid, d.id_details, p.uuid')
      .orderBy('COUNT(r.uuid)', 'DESC')
      .limit(limit)
      .getMany();
  }

  public async getVehiclesByUser(uuid: string): Promise<Vehicle[] | null> {
    return this.VehicleRepository.find({
      where: { ownerVehicle: { uuid: uuid }, status: Not('inactive') },
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
    const Tecnomecanics = objVehicle.TecnomecanicVehicle;
    const Prices = objVehicle.prices;
    const Soats = objVehicle.soatVehicle;
    const tecnicalDetails = objVehicle.detailsVehicle;
    if (objVehicle.typeSaleVehicle) {
      objVehicle.idTypeSale = objVehicle.typeSaleVehicle.uuid;
    }
    return this.VehicleRepository.save(objVehicle)
      .then(async (vehicle) => {
        if (Tecnomecanics) {
          for (const tecnomecanic of Tecnomecanics) {
            tecnomecanic.idVehicle = vehicle.uuid;
            await this.TecnomecanicRepository.save(tecnomecanic);
          }
        }
        if (Prices) {
          for (const price of Prices) {
            price.idVehicle = vehicle.uuid;
            await this.PricesRepository.save(price);
          }
        }
        if (Soats) {
          for (const soat of Soats) {
            soat.idVehicle = vehicle.uuid;
            await this.SoatRepository.save(soat);
          }
        }
        if (tecnicalDetails) {
          tecnicalDetails.idVehicle = vehicle.uuid;
          await this.TecnicalDetailsRepository.save(tecnicalDetails);
        }
        return vehicle;
      })
      .catch((error) => {
        return new HttpException(`Error creating Vehicle: ${error}`, 500);
      });
  }

  public async updateVehicle(
    objVehicle: Vehicle,
  ): Promise<{ response: UpdateResult; Vehicle: Vehicle } | HttpException> {
    const newPrice = objVehicle.prices && objVehicle.prices[0];
    objVehicle.typeSaleVehicle = undefined; // Avoid circular reference
    if (newPrice) {
      newPrice.idVehicle = objVehicle.uuid;
      await this.PricesRepository.save(newPrice);
    }
    objVehicle.updatedAt = new Date();
    return this.VehicleRepository.save(objVehicle)
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

  public async changeStatusVehicle(obj: {uuid: string, status: "available" | "booked" | "out_of_service" | "in_use" | "lost" | "inactive"}): Promise<UpdateResult | HttpException> {
     return this.VehicleRepository.update(obj.uuid, { status: obj.status })
      .then((response) => {
        return new HttpException(JSON.stringify(response), 200);
      })
      .catch((error) => {
        return new HttpException(`Error changing User status: ${error}`, 500);
      });
  }

  public async deleteVehicle(uuid: string): Promise<DeleteResult> {
    return this.VehicleRepository.delete(uuid);
  }
}

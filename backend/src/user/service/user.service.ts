import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../models/user';
import { Fines } from '../models/fines';
import axios from 'axios';

@Injectable()
export class UserService {
  public UserRepository: Repository<User>;
  public FinesRepository: Repository<Fines>;
  constructor(poolConexion: DataSource) {
    this.UserRepository = poolConexion.getRepository(User);
    this.FinesRepository = poolConexion.getRepository(Fines);
  }

  // Métodos privados
  public async listUsers(): Promise<User[]> {
    return this.UserRepository.find({
      order: { firstName: 'ASC' },
      relations: ['rolUser', 'typeDocumentUser'],
      select: {
        typeDocumentUser: { name: true },
        rolUser: { name: true },
      },
    });
  }

  public async getUsersByUUID(uuid: string): Promise<User | null> {
    return this.UserRepository.findOne({
      where: { uuid: uuid },
      relations: ['rolUser', 'typeDocumentUser'],
      select: {
        typeDocumentUser: { name: true },
        rolUser: { name: true },
      },
    });
  }

  public async createUser(objUser: User): Promise<User | HttpException> {
    try {
      /* const Backgrounds = await fetch(
        'http://localhost:5001/antecedentes',
        {
          method: 'POST',
          body: JSON.stringify({
          nombres: objUser.firstName + ' ' + objUser.lastName,
          documento: objUser.noDocument,
          tipoDocumento: objUser.typeDocumentUser?.name,
        }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ).then((response) => response.json());

      console.log('Respuesta de la API de antecedentes:', Backgrounds);
      if (Backgrounds.data.error) {
        throw new Error(Backgrounds.data.error);
      }

      if (Backgrounds.data.mensaje_antecedentes == 'El ciudadano no presenta antecedentes') {
        objUser.status = 'active';
      } else {
        objUser.status = 'under_review';
      } */       
            
      const savedUser = await this.UserRepository.save(objUser);
/* 
      const response = await axios.post('http://127.0.0.1:5000/api/multas', {
        cedula: objUser.noDocument,
      });
      console.log('Respuesta de la API de multas:', response.data);

      const fines = response.data.multas;

      if (Array.isArray(fines)) {
        const finesToSave = fines.map((fine) => {
          const [day, month, year] = fine.fecha_comparendo.split('/');
          const newDate = new Date(`${year}-${month}-${day}`);

          return this.FinesRepository.create({
            noFine: fine.numero_comparendo,
            status: fine.estado,
            fineDate: newDate,
            infractionCode: fine.codigo_infraccion,
            infractionDescription: fine.descripcion_infraccion,
            entitie: fine.entidad,
            idUser: savedUser.uuid,
          });
        });

        await this.FinesRepository.save(finesToSave);
      } */

      return savedUser;
    } catch (error) {
      console.error('Error creating user or saving fines:', error);
      return new HttpException(
        `Error creating User or fetching fines: ${error.message}`,
        500,
      );
    }
  }

  public async updateUser(
    uuid: string,
    objUser: User,
  ): Promise<{ response: UpdateResult; User: User } | HttpException> {
    objUser.updatedAt = new Date();
    objUser.rolUser = undefined; 
    return this.UserRepository.save(objUser)
      .then((response) => {
        return new HttpException(
          JSON.stringify({ response: response, User: objUser }),
          200,
        );
      })
      .catch((error) => {
        return new HttpException(`Error updating User: ${error}`, 500);
      });
  }

  public async changeRoleUser(obj: {uuid: string, role: string}): Promise<UpdateResult | HttpException> {
    return this.UserRepository.update(obj.uuid, { idRole: obj.role })
      .then((response) => {
        return new HttpException(JSON.stringify(response), 200);
      })
      .catch((error) => {
        return new HttpException(`Error changing User status: ${error}`, 500);
      });
  }
  
  public async changeStatus(obj: {uuid: string, status: 'active' | 'inactive' | 'under_review' }): Promise<UpdateResult | HttpException> {
    return this.UserRepository.update(obj.uuid, { status: obj.status })
      .then((response) => {
        return new HttpException(JSON.stringify(response), 200);
      })
      .catch((error) => {
        return new HttpException(`Error changing User status: ${error}`, 500);
      });
  }

  public async deleteUser(uuid: string): Promise<DeleteResult> {
    return this.UserRepository.delete(uuid);
  }
}

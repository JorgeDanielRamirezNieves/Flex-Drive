import { Global, Module } from '@nestjs/common';
import { Fines } from 'src/user/models/fines';
import { Role } from 'src/user/models/role';
import { TypeDocument } from 'src/user/models/type-document';
import { User } from 'src/user/models/user';
import { Soat } from 'src/vehicle/models/soat';
import { TecnicalDetails } from 'src/vehicle/models/tecnical-details';
import { Tecnomecanic } from 'src/vehicle/models/tecnomecanic';
import { TypeSale } from 'src/vehicle/models/type_sale';
import { Vehicle } from 'src/vehicle/models/vehicle';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Global()
@Module({
  imports: [],
  exports: [DataSource],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        try {
          const poolConexion = new DataSource({
            type: 'postgres',
            url: String(process.env.DATABASE_URL),
            logging: true, //Consoles
            synchronize: true,
            ssl: {
              rejectUnauthorized: false, // Necesario para las conexiones SSL a Supabase
            },
            namingStrategy: new SnakeNamingStrategy(), //
            entities: [TypeDocument, Role, User, Vehicle, TypeSale, Tecnomecanic, TecnicalDetails, Soat, Fines], //Aquí van todas las entidades
          });
          await poolConexion.initialize();
          console.log('Conexión establecida con: supabase');
          return poolConexion;
        } catch (error) {
          console.error('Error al conectar a la base de datos:', error);
          throw error; // Lanza el error para que el módulo no se cargue si hay un problema de conexión
        }
      },
    },
  ],
})
export class ConectionModule {}

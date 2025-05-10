import { Global, Module } from '@nestjs/common';
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
            entities: [], //Aquí van todas las entidades
          });
          await poolConexion.initialize();
          console.log(
            'Conexión establecida con: ',
            String(process.env.DATABASE_URL),
          );
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

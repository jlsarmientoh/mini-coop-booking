import { SQLRepository } from "../respositorioes/sql.respository";
import { DataSource } from "typeorm";

export const databaseProviders = [
    {
        provide: 'SQL',
        useFactory: async () => {
            const repository = new SQLRepository();
            await repository.initDb();
            await repository.populate();

            return repository;
        }
    },
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
          const dataSource = new DataSource({
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            entities: [
                __dirname + '/../models/entities/*.entity{.ts,.js}'
            ],
            synchronize: true,
          }); 

          return dataSource.initialize(); 
        },
    }
];
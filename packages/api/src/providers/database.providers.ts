import { SQLRepository } from "../respositorioes/sql.respository";

export const databaseProviders = [
    {
        provide: 'SQL',
        useFactory: async () => {
            const repository = new SQLRepository();
            await repository.initDb();
            await repository.populate();

            return repository;
        }
    }
];
import { Module } from "@nestjs/common";
import { databaseProviders } from "./providers/database.providers";
import { repositroyProviders } from "./providers/repository.providers";

@Module({
    providers: [...databaseProviders, ...repositroyProviders],
    exports: [...databaseProviders, ...repositroyProviders],
})
export class DatabaseModule {}
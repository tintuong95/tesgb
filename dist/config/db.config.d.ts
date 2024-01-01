import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
export declare const dbConfig: (configService: ConfigService) => TypeOrmModuleOptions;
export declare const ormConfig: {
    type: string;
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
    entities: string[];
    migrations: string[];
    cli: {
        migrationsDir: string;
    };
    seeds: string[];
    factories: string[];
    synchronize: boolean;
};

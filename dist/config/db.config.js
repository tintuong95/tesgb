"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = exports.dbConfig = void 0;
const dbConfig = (configService) => ({
    autoLoadEntities: true,
    type: configService.get('database.type'),
    host: configService.get('database.host'),
    port: configService.get('database.port'),
    username: configService.get('database.username'),
    password: configService.get('database.password'),
    database: configService.get('database.name'),
    migrations: ['src/database/migration/*{.ts,.js}'],
    synchronize: false,
    migrationsRun: false,
    dropSchema: false,
    logging: true,
});
exports.dbConfig = dbConfig;
exports.ormConfig = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/entities/*{.ts,.js}'],
    migrations: ['dist/database/migrations/*{.ts,.js}'],
    cli: {
        migrationsDir: 'dist/database/migrations',
    },
    seeds: ['dist/database/seeders/*.js'],
    factories: ['dist/database/factories/*.js'],
    synchronize: true,
};
//# sourceMappingURL=db.config.js.map
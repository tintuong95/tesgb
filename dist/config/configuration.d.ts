import { ConfigModuleOptions } from '@nestjs/config';
export declare const configuration: () => {
    port: number;
    database: {
        host: string;
        port: number;
        type: string;
        username: string;
        password: string;
        name: string;
    };
    jwt: {
        secret_key: string;
        expiration_time: number;
    };
    payos: {
        client_id: string;
        api_key: string;
        checksum_key: string;
        url: string;
    };
    domain: {
        frontend: string;
    };
};
export declare const envConfig: ConfigModuleOptions;

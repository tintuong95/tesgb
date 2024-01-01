import { ServiceType } from '../entities/core';
import { Repository } from 'typeorm';
import { CreateServiceTypeDto, UpdateServiceTypeDto } from '../Entities/Dto/core';
import { IServiceTypeService } from './Interfaces/IServiceTypeService';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class ServiceTypeService implements IServiceTypeService {
    private serviceRepository;
    constructor(serviceRepository: Repository<ServiceType>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<ServiceType | any>;
    createAsync(createServiceTypeDto: CreateServiceTypeDto, user: UserDto): Promise<ServiceType>;
    updateAsync(id: string, updateServiceTypeDto: UpdateServiceTypeDto, user: UserDto): Promise<ServiceType>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}

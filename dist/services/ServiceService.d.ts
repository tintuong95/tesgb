import { Service } from '../entities/core';
import { Repository } from 'typeorm';
import { CreateServiceDto, UpdateServiceDto } from '../Entities/Dto/core';
import { Request } from 'express';
import { IServiceService } from './Interfaces/IServiceService';
import { UserDto } from 'Shared/user.dto';
export declare class ServiceService implements IServiceService {
    private serviceRepository;
    constructor(serviceRepository: Repository<Service>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Service | any>;
    findByServiceTypeId(serviceTypeId: string, user: UserDto): Promise<Service | any>;
    createAsync(createServiceDto: CreateServiceDto, user: UserDto): Promise<Service>;
    updateAsync(id: string, updateServiceDto: UpdateServiceDto, user: UserDto): Promise<Service>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
    countServiceStatusCurrent(user: UserDto, request: Request): Promise<any>;
}

import { ServiceOrder } from '../entities/core';
import { Repository } from 'typeorm';
import { CreatedServiceOrderDto, UpdatedServiceOrderDto } from 'Entities/Dto/core';
import { Request } from 'express';
import { IServiceOrderService } from './Interfaces/IServiceOrderService';
import { UserDto } from 'Shared/user.dto';
export declare class ServiceOrderService implements IServiceOrderService {
    private serviceOrderRepository;
    constructor(serviceOrderRepository: Repository<ServiceOrder>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<ServiceOrder | any>;
    createAsync(createServiceOrderDto: CreatedServiceOrderDto[]): Promise<ServiceOrder[]>;
    updateAsync(id: string, updateServiceOrderDto: UpdatedServiceOrderDto, user: UserDto): Promise<ServiceOrder>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}

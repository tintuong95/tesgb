import { CreateServiceDto, UpdateServiceDto } from '../Entities/Dto/core';
import { Service } from '../entities/Service';
import { ServiceService } from '@services/ServiceService';
import { Request } from 'express';
import { IServiceController } from './Interfaces/IServiceController';
import { UserDto } from 'Shared/user.dto';
export declare class ServiceController implements IServiceController {
    private serviceService;
    constructor(serviceService: ServiceService);
    getAllServices(request: Request, user: UserDto): Promise<Service[]>;
    getAllByServiceTypeId(user: UserDto, id: string): Promise<Service[]>;
    getServiceDetails(id: string, user: UserDto): Promise<Service>;
    createService(createServiceDto: CreateServiceDto, user: UserDto): Promise<Service>;
    updateService(updateServiceDto: UpdateServiceDto, user: UserDto, id: string): Promise<Service>;
    removeService(id: string, user: UserDto): Promise<string>;
    restoreService(id: string, user: UserDto): Promise<string>;
    deleteService(id: string, user: UserDto): Promise<string>;
    countEmployeeByStatus(user: UserDto, request: Request): Promise<string>;
}

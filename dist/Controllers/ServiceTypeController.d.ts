import { CreateServiceTypeDto, UpdateServiceTypeDto } from '../Entities/Dto/core';
import { ServiceType } from '../entities/ServiceType';
import { ServiceTypeService } from '@services/ServiceTypeService';
import { IServiceTypeController } from './Interfaces/IServiceTypeController';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class ServiceTypeController implements IServiceTypeController {
    private serviceTypeService;
    constructor(serviceTypeService: ServiceTypeService);
    getAllServiceTypes(request: Request, user: UserDto): Promise<ServiceType[]>;
    getServiceTypeDetails(id: string, user: UserDto): Promise<ServiceType>;
    createServiceType(createServiceTypeDto: CreateServiceTypeDto, user: UserDto): Promise<ServiceType>;
    updateServiceType(updateServiceTypeDto: UpdateServiceTypeDto, user: UserDto, id: string): Promise<ServiceType>;
    removeServiceType(id: string, user: UserDto): Promise<string>;
    restoreServiceType(id: string, user: UserDto): Promise<string>;
    deleteServiceType(id: string, user: UserDto): Promise<string>;
}

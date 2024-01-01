import { ServiceType } from '@entities/ServiceType';
import { CreateServiceTypeDto, UpdateServiceTypeDto } from 'Entities/Dto/ServiceType';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IServiceTypeController {
    getAllServiceTypes(request: Request, user: UserDto): Promise<ServiceType[]>;
    getServiceTypeDetails(id: string, user: UserDto): Promise<ServiceType>;
    createServiceType(createServiceTypeDto: CreateServiceTypeDto, user: UserDto): Promise<ServiceType>;
    updateServiceType(updateServiceTypeDto: UpdateServiceTypeDto, user: UserDto, id: string): Promise<ServiceType>;
    removeServiceType(id: string, user: UserDto): Promise<string>;
    restoreServiceType(id: string, user: UserDto): Promise<string>;
    deleteServiceType(id: string, user: UserDto): Promise<string>;
}

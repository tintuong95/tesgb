import { Service } from '@entities/Service';
import { CreateServiceDto, UpdateServiceDto } from 'Entities/Dto/Service';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IServiceController {
    getAllServices(request: Request, user: UserDto): Promise<Service[]>;
    getServiceDetails(id: string, user: UserDto): Promise<Service>;
    createService(createServiceDto: CreateServiceDto, user: UserDto): Promise<Service>;
    updateService(updateServiceDto: UpdateServiceDto, user: UserDto, id: string): Promise<Service>;
    removeService(id: string, user: UserDto): Promise<string>;
    restoreService(id: string, user: UserDto): Promise<string>;
    deleteService(id: string, user: UserDto): Promise<string>;
}

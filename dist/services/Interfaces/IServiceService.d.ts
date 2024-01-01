import { Service } from '@entities/Service';
import { CreateServiceDto, UpdateServiceDto } from 'Entities/Dto/Service';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IServiceService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Service | any>;
    findByServiceTypeId(serviceTypeId: string, user: UserDto): Promise<Service[]>;
    createAsync(createServiceDto: CreateServiceDto, user: UserDto): Promise<Service>;
    updateAsync(id: string, updateServiceDto: UpdateServiceDto, user: UserDto): Promise<Service>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}

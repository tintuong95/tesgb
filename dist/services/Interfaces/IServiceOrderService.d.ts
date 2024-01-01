import { ServiceOrder } from '@entities/ServiceOrder';
import { CreatedServiceOrderDto, UpdatedServiceOrderDto } from 'Entities/Dto/ServiceOrder';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IServiceOrderService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<ServiceOrder | any>;
    createAsync(createServiceOrderDto: CreatedServiceOrderDto[]): Promise<ServiceOrder[]>;
    updateAsync(id: string, updateServiceOrderDto: UpdatedServiceOrderDto, user: UserDto): Promise<ServiceOrder>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}

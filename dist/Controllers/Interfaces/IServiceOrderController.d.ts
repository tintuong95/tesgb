import { ServiceOrder } from '@entities/ServiceOrder';
import { CreatedServiceOrderDto, UpdatedServiceOrderDto } from 'Entities/Dto/ServiceOrder';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IServiceOrderController {
    getAllServiceOrder(request: Request, user: UserDto): Promise<ServiceOrder[]>;
    getServiceOrderDetails(id: string, user: UserDto): Promise<ServiceOrder>;
    createServiceOrder(createServiceOrderDto: CreatedServiceOrderDto[]): Promise<ServiceOrder[]>;
    updateServiceOrder(updateServiceOrderDto: UpdatedServiceOrderDto, user: UserDto, id: string): Promise<ServiceOrder>;
    removeServiceOrder(id: string, user: UserDto): Promise<string>;
    restoreServiceOrder(id: string, user: UserDto): Promise<string>;
    deleteServiceOrder(id: string, user: UserDto): Promise<string>;
}

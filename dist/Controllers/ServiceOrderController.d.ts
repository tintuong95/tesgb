import { ServiceOrderService } from '../services/core';
import { CreatedServiceOrderDto, UpdatedServiceOrderDto } from '../Entities/Dto/core';
import { ServiceOrder } from '../entities/core';
import { Request } from 'express';
import { IServiceOrderController } from './Interfaces/IServiceOrderController';
import { UserDto } from 'Shared/user.dto';
export declare class ServiceOrderController implements IServiceOrderController {
    private serviceOrderService;
    constructor(serviceOrderService: ServiceOrderService);
    getAllServiceOrder(request: Request, user: UserDto): Promise<ServiceOrder[]>;
    getServiceOrderDetails(id: string, user: UserDto): Promise<ServiceOrder>;
    createServiceOrder(createServiceOrderDto: CreatedServiceOrderDto[]): Promise<ServiceOrder[]>;
    updateServiceOrder(updateServiceOrderDto: UpdatedServiceOrderDto, user: UserDto, id: string): Promise<ServiceOrder>;
    removeServiceOrder(id: string, user: UserDto): Promise<string>;
    restoreServiceOrder(id: string, user: UserDto): Promise<string>;
    deleteServiceOrder(id: string, user: UserDto): Promise<string>;
}

import { CreatedOtherOrderDto, UpdatedOtherOrderDto } from '../Entities/Dto/core';
import { OtherOrder } from '../entities/OtherOrder';
import { OtherOrderService } from '@services/OtherOrderService';
import { IOtherOrderController } from './Interfaces/IOtherOrderController';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class OtherOrderController implements IOtherOrderController {
    private OtherOrderService;
    constructor(OtherOrderService: OtherOrderService);
    getAllOtherOrders(request: Request, user: UserDto): Promise<OtherOrder[]>;
    getOtherOrderDetails(id: string, user: UserDto): Promise<OtherOrder>;
    createOtherOrder(createOtherOrderDto: CreatedOtherOrderDto[]): Promise<OtherOrder[]>;
    updateOtherOrder(updateOtherOrderDto: UpdatedOtherOrderDto, user: UserDto, id: string): Promise<OtherOrder>;
    removeOtherOrder(id: string, user: UserDto): Promise<string>;
    restoreOtherOrder(id: string, user: UserDto): Promise<string>;
    deleteOtherOrder(id: string, user: UserDto): Promise<string>;
}

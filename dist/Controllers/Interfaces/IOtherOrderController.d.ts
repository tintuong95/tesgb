import { OtherOrder } from '@entities/OtherOrder';
import { CreatedOtherOrderDto, UpdatedOtherOrderDto } from 'Entities/Dto/OtherOrder';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IOtherOrderController {
    getAllOtherOrders(request: Request, user: UserDto): Promise<OtherOrder[]>;
    getOtherOrderDetails(id: string, user: UserDto): Promise<OtherOrder>;
    createOtherOrder(createOtherOrderDto: CreatedOtherOrderDto[], user: UserDto): Promise<OtherOrder[]>;
    updateOtherOrder(updateOtherOrderDto: UpdatedOtherOrderDto, user: UserDto, id: string): Promise<OtherOrder>;
    removeOtherOrder(id: string, user: UserDto): Promise<string>;
    restoreOtherOrder(id: string, user: UserDto): Promise<string>;
    deleteOtherOrder(id: string, user: UserDto): Promise<string>;
}

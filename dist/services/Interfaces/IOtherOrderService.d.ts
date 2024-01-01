import { OtherOrder } from '@entities/OtherOrder';
import { CreatedOtherOrderDto, UpdatedOtherOrderDto } from 'Entities/Dto/OtherOrder';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IOtherOrderService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<OtherOrder | any>;
    createAsync(createOtherOrderDto: CreatedOtherOrderDto[], user: UserDto): Promise<OtherOrder[]>;
    updateAsync(id: string, updateOtherOrderDto: UpdatedOtherOrderDto, user: UserDto): Promise<OtherOrder>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}

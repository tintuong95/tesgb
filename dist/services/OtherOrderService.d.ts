import { OtherOrder } from '../entities/core';
import { Repository } from 'typeorm';
import { CreatedOtherOrderDto, UpdatedOtherOrderDto } from '../Entities/Dto/core';
import { IOtherOrderService } from './Interfaces/IOtherOrderService';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class OtherOrderService implements IOtherOrderService {
    private OtherOrderRepository;
    constructor(OtherOrderRepository: Repository<OtherOrder>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<OtherOrder | any>;
    createAsync(createOtherOrderDto: CreatedOtherOrderDto[]): Promise<OtherOrder[]>;
    updateAsync(id: string, updateOtherOrderDto: UpdatedOtherOrderDto, user: UserDto): Promise<OtherOrder>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}

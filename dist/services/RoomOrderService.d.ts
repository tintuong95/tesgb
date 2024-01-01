import { RoomOrder } from '../entities/core';
import { Repository } from 'typeorm';
import { CreatedRoomOrderDto, UpdatedRoomOrderDto } from '../Entities/Dto/core';
import { IRoomOrderService } from './Interfaces/IRoomOrderService';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class RoomOrderService implements IRoomOrderService {
    private roomOrderRepository;
    constructor(roomOrderRepository: Repository<RoomOrder>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<RoomOrder | any>;
    createAsync(createRoomOrderDto: CreatedRoomOrderDto[]): Promise<RoomOrder[]>;
    updateAsync(id: string, updateRoomOrderDto: UpdatedRoomOrderDto, user: UserDto): Promise<RoomOrder>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}

import { OrderService, RoomService } from '../services/core';
import { CreateRoomDto, UpdateRoomDto } from '../Entities/Dto/core';
import { Room } from '../Entities/Room';
import { IRoomController } from './Interfaces/IRoomController';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class RoomController implements IRoomController {
    private roomService;
    private orderService;
    constructor(roomService: RoomService, orderService: OrderService);
    getAllRooms(request: Request, user: UserDto): Promise<Room[] | any>;
    getAllPriceRooms(idList: string[], user: UserDto): Promise<Room[]>;
    getRoomDetails(id: string, user: UserDto): Promise<Room>;
    createRoom(createRoomDto: CreateRoomDto[], user: UserDto): Promise<Room[]>;
    updateRoom(updateRoomDto: UpdateRoomDto, user: UserDto, id: string): Promise<Room>;
    removeRoom(id: string, user: UserDto): Promise<string>;
    restoreRoom(id: string, user: UserDto): Promise<string>;
    deleteRoom(id: string, user: UserDto): Promise<string>;
    countRoomStatus(user: UserDto): Promise<any>;
}

import { Promotion } from '../entities/core';
import { Repository } from 'typeorm';
import { CreatePromotionDto, UpdatePromotionDto } from '../Entities/Dto/core';
import { IPromotionService } from './Interfaces/core';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class PromotionService implements IPromotionService {
    private promotionRepository;
    constructor(promotionRepository: Repository<Promotion>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Promotion | any>;
    createAsync(createPromotionDto: CreatePromotionDto, user: UserDto): Promise<Promotion>;
    updateAsync(id: string, updatePromotionDto: UpdatePromotionDto, user: UserDto): Promise<Promotion>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}

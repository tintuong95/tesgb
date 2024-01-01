import { Promotion } from '@entities/Promotion';
import { CreatePromotionDto, UpdatePromotionDto } from 'Entities/Dto/Promotion';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IPromotionController {
    getAllPromotions(request: Request, user: UserDto): Promise<Promotion[]>;
    getPromotionDetails(id: string, user: UserDto): Promise<Promotion>;
    createPromotion(createPromotionDto: CreatePromotionDto, user: UserDto): Promise<Promotion>;
    updatePromotion(updatePromotionDto: UpdatePromotionDto, user: UserDto, id: string): Promise<Promotion>;
    removePromotion(id: string, user: UserDto): Promise<string>;
    restorePromotion(id: string, user: UserDto): Promise<string>;
    deletePromotion(id: string, user: UserDto): Promise<string>;
}

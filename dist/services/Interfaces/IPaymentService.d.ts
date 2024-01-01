import { Payment } from '@entities/Payment';
import { CreatePaymentOptionDto, UpdatePaymentDto } from 'Entities/Dto/Payment';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IPaymentService {
    _url: string;
    _client_id: string;
    _api_key: string;
    _checksum_key: string;
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: number, user: UserDto): Promise<Payment>;
    createAsync(createPaymentOptionDto: CreatePaymentOptionDto, user: UserDto): Promise<any>;
    updateAsync(id: number, updatePaymentDto: UpdatePaymentDto, user: UserDto): Promise<Payment>;
    removeAsync(id: number, user: UserDto): Promise<string>;
    restoreAsync(id: number, user: UserDto): Promise<string>;
    deleteAsync(id: number, user: UserDto): Promise<string>;
}

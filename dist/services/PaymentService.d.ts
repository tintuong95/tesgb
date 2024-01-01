import { Payment } from '../entities/core';
import { Repository } from 'typeorm';
import { CreatePaymentOptionDto, UpdatePaymentDto } from '../Entities/Dto/core';
import { Request } from 'express';
import { IPaymentService } from './Interfaces/IPaymentService';
import { UserDto } from 'Shared/user.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
export declare class PaymentService implements IPaymentService {
    private paymentRepository;
    private configService;
    private readonly httpService;
    _url: string;
    _client_id: string;
    _api_key: string;
    _checksum_key: string;
    _domain_frontend: string;
    constructor(paymentRepository: Repository<Payment>, configService: ConfigService, httpService: HttpService);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: number, user: UserDto): Promise<Payment | any>;
    createAsync(createPaymentOptionDto: CreatePaymentOptionDto, user: UserDto): Promise<any>;
    updateAsync(id: number, updatePaymentDto: UpdatePaymentDto, user: UserDto): Promise<Payment>;
    removeAsync(id: number, user: UserDto): Promise<string>;
    restoreAsync(id: number, user: UserDto): Promise<string>;
    deleteAsync(id: number, user: UserDto): Promise<string>;
    checkPaymentRequest(id: string, user: UserDto): Promise<any>;
}

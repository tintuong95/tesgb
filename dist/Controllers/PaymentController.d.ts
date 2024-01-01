import { AccountService, PaymentService } from '../services/core';
import { CreatePaymentOptionDto, UpdatePaymentDto } from '../Entities/Dto/core';
import { Payment } from '../entities/Payment';
import { Request } from 'express';
import { IPaymentController } from './Interfaces/IPaymentController';
import { UserDto } from 'Shared/user.dto';
export declare class PaymentController implements IPaymentController {
    private paymentService;
    private accountService;
    constructor(paymentService: PaymentService, accountService: AccountService);
    getAllPayments(request: Request, user: UserDto): Promise<Payment[]>;
    getPaymentDetails(id: number, user: UserDto): Promise<Payment>;
    createPayment(createPaymentOptionDto: CreatePaymentOptionDto, user: UserDto): Promise<Payment>;
    updatePayment(updatePaymentDto: UpdatePaymentDto, user: UserDto, id: number): Promise<Payment>;
    removePayment(id: number, user: UserDto): Promise<string>;
    restorePayment(id: number, user: UserDto): Promise<string>;
    deletePayment(id: number, user: UserDto): Promise<string>;
    checkPayment(id: string, user: UserDto): Promise<any>;
}

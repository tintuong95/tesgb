import { Payment } from '@entities/Payment';
import { CreatePaymentOptionDto, UpdatePaymentDto } from 'Entities/Dto/Payment';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IPaymentController {
    getAllPayments(request: Request, user: UserDto): Promise<Payment[]>;
    getPaymentDetails(id: number, user: UserDto): Promise<Payment>;
    createPayment(CreatePaymentOptionDto: CreatePaymentOptionDto, user: UserDto): Promise<Payment>;
    updatePayment(updatePaymentDto: UpdatePaymentDto, user: UserDto, id: number): Promise<Payment>;
    restorePayment(id: number, user: UserDto): Promise<string>;
    deletePayment(id: number, user: UserDto): Promise<string>;
    removePayment(id: number, user: UserDto): Promise<string>;
}

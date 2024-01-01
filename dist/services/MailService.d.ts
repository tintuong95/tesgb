import { MailerService } from '@nestjs-modules/mailer';
import { CreateMailDto } from 'Entities/Dto/Mail';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendUserConfirmation(createMail: CreateMailDto): Promise<void>;
}

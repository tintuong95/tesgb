import {Injectable} from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';
import {CreateMailDto} from 'Entities/Dto/Mail';
@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {}

	async sendUserConfirmation(createMail: CreateMailDto) {
		try {
			await this.mailerService.sendMail(createMail);
		} catch (e) {
			console.log(e);
		}
	}
}

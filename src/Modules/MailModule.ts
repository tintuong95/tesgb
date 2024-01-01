import {Module} from '@nestjs/common';
import {MailService} from '../Services/core';
import {MailerModule} from '@nestjs-modules/mailer';

@Module({
	imports: [
		MailerModule.forRoot({
			// transport: 'smtps://user@example.com:topsecret@smtp.example.com',
			// or
			transport: {
				host: 'mail49.vietnix.vn',
				port: 465,
				secure: true,

				auth: {
					user: 'admin@vnnix.com',
					pass: 'Tuong0962@',
				},
			},
			defaults: {
				from: 'admin@vnnix.com',
			},
		}),
	],
	providers: [MailService],
	exports: [MailService], // 👈 export for DI
})
export class MailModule {}

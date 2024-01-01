import {Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt/dist';
import {PassportModule} from '@nestjs/passport';

import {MemberModule} from './MemberModule';
import {AuthService} from 'Services/AuthService';
import {JwtStrategyService} from 'Services/JwtStrategyService';
import {AuthController} from 'Controllers/AuthController';
import {ProductModule} from './ProductModule';
import {AccountModule} from './AccountModule';
import {MailModule} from './MailModule';

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => {
				return {
					secret: configService.get<string>('jwt.secret_key'),
					signOptions: {
						expiresIn: configService.get<number>('jwt.expiration_time'),
					},
				};
			},
			inject: [ConfigService],
		}),
		MemberModule,
		AccountModule,
		MailModule,
	],
	providers: [AuthService, JwtStrategyService],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}

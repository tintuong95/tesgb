import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Payment} from '../entities/core';
import {PaymentController} from '../Controllers/core';
import {PaymentService} from '../services/core';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {HttpModule} from '@nestjs/axios';
import {AccountModule} from './AccountModule';

@Module({
	controllers: [PaymentController],
	providers: [PaymentService],
	imports: [
		TypeOrmModule.forFeature([Payment]),
		ConfigModule,
		HttpModule.registerAsync({
			useFactory: () => ({
				timeout: 2500,
				maxRedirects: 5,
			}),
		}),
		AccountModule,
	],
	exports: [TypeOrmModule],
})
export class PaymentModule {}

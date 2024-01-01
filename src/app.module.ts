import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {envConfig} from '@config/configuration';
import {dbConfig} from '@config/db.config';

import {APP_FILTER, APP_PIPE} from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common/pipes';

import {
	RoleModule,
	CustomerModule,
	FeedbackModule,
	LogModule,
	PaymentModule,
	PriceModule,
	PromotionModule,
	ReportModule,
	OrderModule,
	RoomModule,
	StaffModule,
	AccountModule,
	StockModule,
	StockHistoryModule,
	ProductModule,
	CustomerOrderModule,
	EmployeesModule,
	MemberModule,
	PayrollModule,
	ServiceOrderModule,
	RoomOrderModule,
	OtherOrderModule,
} from 'Modules/core';
import {RoomTypeModule} from 'Modules/RoomTypeModule';
import {FloorModule} from 'Modules/FloorModule';
import {HttpExceptionFilter} from '@util/exception.filter';
import {ServiceModule} from 'Modules/ServiceModule';
import {ServiceTypeModule} from 'Modules/ServiceTypeModule';
import {AuthModule} from 'Modules/AuthModule';
import {RevenueModule} from 'Modules/RevenueModule';
import {PriceItemModule} from 'Modules/PriceItemModule';
import {UnitModule} from 'Modules/UnitModule';
import {GenerateModule} from 'Modules/GenerateModule';
import {MailModule} from 'Modules/MailModule';

@Module({
	imports: [
		// ServeStaticModule.forRoot({
		// 	rootPath: join(__dirname, '..', 'uploads'),
		// 	serveStaticOptions: {
		// 		setHeaders(res, path, stat) {
		// 			res.header('Cross-Origin-Resource-Policy', 'cross-origin');
		// 		},
		// 	},
		// }),
		/**
		 * import configuration
		 */
		ConfigModule.forRoot(envConfig),
		/**
		 * import typeorm
		 */
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigService) => dbConfig(configService),
			inject: [ConfigService],
		}),
		/**
		 * import modules
		 */
		AccountModule,
		CustomerModule,
		CustomerOrderModule,
		EmployeesModule,
		FeedbackModule,
		FloorModule,
		LogModule,
		MemberModule,
		OrderModule,
		PaymentModule,
		PayrollModule,
		PriceModule,
		ProductModule,
		PromotionModule,
		ReportModule,
		RoleModule,
		RoomModule,
		RoomTypeModule,
		ServiceModule,
		ServiceOrderModule,
		ServiceTypeModule,
		StaffModule,
		StockModule,
		StockHistoryModule,
		RoomOrderModule,
		AuthModule,
		RevenueModule,
		PriceItemModule,
		UnitModule,
		GenerateModule,
		MailModule,
		OtherOrderModule,
	],
	controllers: [],
	providers: [
		/**
		 * import validator pipeline
		 */
		{
			provide: APP_PIPE,
			useFactory: () =>
				new ValidationPipe({
					whitelist: true,
					transform: true,
					forbidNonWhitelisted: true,
					transformOptions: {
						enableImplicitConversion: true,
					},
				}),
		},
		/**
		 * import exceptions
		 */
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
	],
})
export class AppModule {}

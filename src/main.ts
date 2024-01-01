import {INestApplication, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {configOpenApi} from '@config/open-api.config';
import {AppModule} from './app.module';
import helmet from 'helmet';
import {NestExpressApplication} from '@nestjs/platform-express';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ValidationError} from 'class-validator';
import {DtoValidationError} from 'Shared/error.dto';

async function bootstrap() {
	const app: INestApplication =
		await NestFactory.create<NestExpressApplication>(AppModule, {
			rawBody: true, //application/json
			logger: ['error', 'warn', 'log', 'verbose', 'debug'],
		});

	/**
	 * setup cors
	 */
	app.enableCors();

	/**
	 * open api
	 */
	configOpenApi(app);
	/**
	 * setup csur
	 */
	// app.use(csurf());
	/**
	 * setup helmet
	 */
	app.use(helmet());

	/**
	 * setup prefix
	 */
	// app.setGlobalPrefix('v1/api');
	/**
	 * swagger endpoint
	 */

	const config = new DocumentBuilder()
		.setTitle('Cats example')
		.setDescription('The cats API description')
		.setVersion('1.0')
		.setExternalDoc('Postman Collection', '/docs-json')
		.addTag('cats')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);

	await app.listen(3000);
}
bootstrap();

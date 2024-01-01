import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Service} from '../entities/core';
import {ServiceController} from '../Controllers/core';
import {ServiceService} from '../services/core';

@Module({
	controllers: [ServiceController],
	providers: [ServiceService],
	imports: [TypeOrmModule.forFeature([Service])],
	exports: [TypeOrmModule],
})
export class ServiceModule {}

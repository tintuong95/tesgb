import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {ServiceType} from '../entities/core';
import {ServiceTypeController} from '../Controllers/core';
import {ServiceTypeService} from '../services/core';

@Module({
	controllers: [ServiceTypeController],
	providers: [ServiceTypeService],
	imports: [TypeOrmModule.forFeature([ServiceType])],
	exports: [TypeOrmModule],
})
export class ServiceTypeModule {}

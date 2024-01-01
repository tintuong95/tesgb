import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Floor} from '../entities/core';
import {FloorController} from '../Controllers/core';
import {FloorService} from '../services/core';

@Module({
	controllers: [FloorController],
	providers: [FloorService],
	imports: [TypeOrmModule.forFeature([Floor])],
	exports: [TypeOrmModule],
})
export class FloorModule {}

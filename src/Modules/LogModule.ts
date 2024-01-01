import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Log} from '../entities/core';
import {LogController} from '../Controllers/core';
import {LogService} from '../services/core';

@Module({
	controllers: [LogController],
	providers: [LogService],
	imports: [TypeOrmModule.forFeature([Log])],
	exports: [TypeOrmModule],
})
export class LogModule {}

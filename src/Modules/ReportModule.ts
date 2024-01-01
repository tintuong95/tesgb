import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Report} from '../entities/core';
import {ReportController} from '../Controllers/core';
import {ReportService} from '../services/core';

@Module({
	controllers: [ReportController],
	providers: [ReportService],
	imports: [TypeOrmModule.forFeature([Report])],
	exports: [TypeOrmModule],
})
export class ReportModule {}

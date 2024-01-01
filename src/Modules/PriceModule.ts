import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Price} from '../entities/core';
import {PriceController} from '../Controllers/core';
import {PriceService} from '../services/core';
import {PriceItemModule} from './PriceItemModule';

@Module({
	controllers: [PriceController],
	providers: [PriceService],
	imports: [TypeOrmModule.forFeature([Price]), PriceItemModule],
	exports: [TypeOrmModule],
})
export class PriceModule {}

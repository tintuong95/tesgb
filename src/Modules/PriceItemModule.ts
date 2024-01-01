import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {PriceItem} from '../entities/core';
import {PriceItemController} from '../Controllers/core';
import {PriceItemService} from '../services/core';

@Module({
	controllers: [PriceItemController],
	providers: [PriceItemService],
	imports: [TypeOrmModule.forFeature([PriceItem])],
	exports: [TypeOrmModule, PriceItemService],
})
export class PriceItemModule {}

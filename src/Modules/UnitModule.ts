import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Unit} from '../entities/core';
import {UnitController} from '../Controllers/core';
import {ProductService, UnitService} from '../services/core';
import {ProductModule} from './ProductModule';
import {MemberModule} from './MemberModule';

@Module({
	controllers: [UnitController],
	providers: [UnitService],
	imports: [TypeOrmModule.forFeature([Unit])],
	exports: [TypeOrmModule, UnitService],
})
export class UnitModule {}

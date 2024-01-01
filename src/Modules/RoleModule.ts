import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {RoleController} from '../Controllers/core';
import {RoleService} from '../services/core';
import {Role} from '@entities/Role';

@Module({
	controllers: [RoleController],
	providers: [RoleService],
	imports: [TypeOrmModule.forFeature([Role])],
	exports: [TypeOrmModule],
})
export class RoleModule {}

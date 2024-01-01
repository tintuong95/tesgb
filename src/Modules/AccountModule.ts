import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Account} from '../entities/core';
import {AccountController} from '../Controllers/core';
import {AccountService} from '../services/core';

@Module({
	controllers: [AccountController],
	providers: [AccountService],
	imports: [TypeOrmModule.forFeature([Account])],
	exports: [TypeOrmModule, AccountService],
})
export class AccountModule {}

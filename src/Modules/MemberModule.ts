import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Member} from '../entities/core';
import {MemberController} from '../Controllers/core';
import {MemberService} from '../services/core';

@Module({
	controllers: [MemberController],
	providers: [MemberService],
	imports: [TypeOrmModule.forFeature([Member])],
	exports: [TypeOrmModule, MemberService],
})
export class MemberModule {}

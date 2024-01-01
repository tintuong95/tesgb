import {Module} from '@nestjs/common';

import {GenerateController} from '../Controllers/core';
import {UnitModule} from './UnitModule';
import {MailModule} from './MailModule';

@Module({
	controllers: [GenerateController],
	providers: [],
	imports: [UnitModule, MailModule],
	exports: [],
})
export class GenerateModule {}

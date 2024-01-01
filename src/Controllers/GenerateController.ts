import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	LoggerService,
	Post,
	UseGuards,
} from '@nestjs/common';

import {ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from 'Services/JwtGuardService';
import {IGenerateController} from './Interfaces/IGenerateController';
import {UnitService} from '@services/UnitService';
import {CreateUnitDto} from 'Entities/Dto/Unit';
import {UnitType} from '@entities/Types/Unit';
import {UserDto} from 'Shared/user.dto';
import {User} from 'Shared/user.decorator';
import {Unit} from '@entities/Unit';
import {MailService} from '../Services/MailService';
import {CreateMailDto} from 'Entities/Dto/Mail';

@Controller('generate')
// @UseGuards(JwtAuthGuard)
@ApiTags('generate')
export class GenerateController implements IGenerateController {
	constructor(
		private unitService: UnitService,
		private mailService: MailService
	) {}
	@Get('units')
	async unitsGenerate(@User() user: UserDto): Promise<Unit[]> {
		try {
			const item1 = new CreateUnitDto('Gói', UnitType.PRODUCT);
			const item2 = new CreateUnitDto('Hộp', UnitType.PRODUCT);
			const item3 = new CreateUnitDto('Thùng', UnitType.PRODUCT);
			const item4 = new CreateUnitDto('Kg', UnitType.PRODUCT);
			const item5 = new CreateUnitDto('Gram', UnitType.PRODUCT);
			const item7 = new CreateUnitDto('Lít', UnitType.PRODUCT);
			const item8 = new CreateUnitDto('Cái', UnitType.PRODUCT);

			const item9 = new CreateUnitDto('Gói', UnitType.SERVICE);
			const item10 = new CreateUnitDto('Hộp', UnitType.SERVICE);
			const item11 = new CreateUnitDto('Thùng', UnitType.SERVICE);
			const item12 = new CreateUnitDto('Kg', UnitType.SERVICE);
			const item13 = new CreateUnitDto('Gram', UnitType.SERVICE);
			const item14 = new CreateUnitDto('Lon', UnitType.SERVICE);
			const item15 = new CreateUnitDto('Phần', UnitType.SERVICE);
			const item16 = new CreateUnitDto('Cái', UnitType.SERVICE);
			const item17 = new CreateUnitDto('Chai', UnitType.SERVICE);
			const payload = [
				item1,
				item2,
				item3,
				item4,
				item5,
				item17,
				item7,
				item8,
				item9,
				item10,
				item11,
				item12,
				item13,
				item14,
				item15,
				item16,
			];
			const rs = await this.unitService.createAsync(payload, user);
			return rs;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get('test')
	async testMail(@User() user: UserDto): Promise<any> {
		try {
			const mail = new CreateMailDto();
			mail.to = 'tintuong95@gmail.com';
			mail.from = 'HOTEL.VNNIX.COM <admin@vnnix.com>';
			mail.subject = 'Xác nhận đăng ký tài khoản ';
			mail.html =
				"<div><h6>Vui lòng kích vào nút bên dưới để xác minh tài khoản</h6><a href='#h'>Xác minh</a></div>";
			const rs = await this.mailService.sendUserConfirmation(mail);
			return rs;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get('log')
	async testLog(@User() user: UserDto): Promise<any> {
		try {
			// this.loggerService.log('Helllo ...............');
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Post('test-remove-list')
	async testRemoveList(
		@Body() ids: {list: string[]},
		@User() user: UserDto
	): Promise<any> {
		try {
			this.unitService.removeListAsync(ids.list, user);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

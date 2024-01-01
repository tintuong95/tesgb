import {
	Body,
	Controller,
	Post,
	HttpCode,
	UseGuards,
	Get,
	Request,
	ForbiddenException,
	Param,
	BadRequestException,
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {AccountService} from '@services/AccountService';
import {MailService} from '../Services/MailService';
import {MemberService} from '@services/MemberService';
import {CreateAccountDto} from 'Entities/Dto/Account';
import {
	CreateMemberDto,
	UpdateMemberDto,
	SigninMemberDto,
} from 'Entities/Dto/Member';
import {JwtAuthGuard} from 'Services/JwtGuardService';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import * as moment from 'moment';
import {CreateMailDto} from 'Entities/Dto/Mail';
import * as CryptoJS from 'crypto-js';
import {decodeData, encodeData} from '@util/cryptoJs';
@Controller('auth')
export class AuthController {
	// @Post('login')
	constructor(
		public readonly memberService: MemberService,
		public readonly accountService: AccountService,
		private jwtService: JwtService,
		private mailService: MailService
	) {}
	@Post('login')
	@HttpCode(200)
	async login(@Body() signInDto: SigninMemberDto) {
		const member = await this.memberService.signinAsync(signInDto);

		const user: any = new Object({
			id: member.id,
			accountId: member.accountId,
			username: member.username,
			nameHotel: member.account.nameHotel,
			type: member.account.type,
			expiredAt: member.account.expiredAt,
		});

		const accessToken = this.jwtService.sign(user);
		return {
			...user,
			accessToken: accessToken,
		};
	}
	@Post('signup')
	@HttpCode(200)
	async signup(
		@Body() signUpDto: {account: CreateAccountDto; member: CreateMemberDto}
	) {
		const account = await this.accountService.createAsync(signUpDto.account);
		const member = await this.memberService.createAsync(
			signUpDto.member,
			account.id
		);
		const user: any = new Object({
			id: member.id,
			accountId: account.id,
			expiredAt: moment().add(5, 'minutes').format('HH:mm:ss DD-MMM-YYYY'),
		});

		const mail = new CreateMailDto();
		mail.to = account.email;
		mail.from = 'HOTEL.VNNIX.COM <admin@vnnix.com>';
		mail.subject = 'Xác Minh Tài Khoản';
		mail.html = `<div>
				<p>Vui lòng kích vào nút bên dưới để xác minh tài khoản</p>
				<a href='http://localhost:3002/verify?type=signup&token=${encodeData(
					user
				)}'>Xác minh</a>
		</div>`;
		this.mailService.sendUserConfirmation(mail);
		return 'Create Account Success';
	}
	@UseGuards(JwtAuthGuard)
	@Get('profile')
	async getProfile(@User() user: UserDto) {
		if (!user) throw new ForbiddenException('Forbidden !');
		const rs = await this.accountService.findOneAsync(user.accountId);
		console.log('user', user);
		delete user.iat;
		delete user.exp;
		user.expiredAt = rs.expiredAt;
		return user;
	}

	@Get('verify/create')
	async createVerify() {
		const user = {
			name: 'Phan Tin Tuong',
			id: 1,
		};

		return encodeData(user);
	}

	@Get('verify/:encryptedData')
	async accountVerify(@Param('encryptedData') encryptedData: string) {
		const decryptedData = decodeData(encryptedData);

		if (decryptedData) {
			const flag = moment().isBefore(moment(decryptedData?.expiredAt));
			if (flag) {
			}
		}
		throw new BadRequestException('Verify fail!');
	}
}

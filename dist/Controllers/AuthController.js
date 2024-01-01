"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const AccountService_1 = require("../services/AccountService");
const MailService_1 = require("../Services/MailService");
const MemberService_1 = require("../services/MemberService");
const Member_1 = require("../Entities/Dto/Member");
const JwtGuardService_1 = require("../Services/JwtGuardService");
const user_decorator_1 = require("../Shared/user.decorator");
const user_dto_1 = require("../Shared/user.dto");
const moment = require("moment");
const Mail_1 = require("../Entities/Dto/Mail");
const cryptoJs_1 = require("../Utils/cryptoJs");
let AuthController = class AuthController {
    constructor(memberService, accountService, jwtService, mailService) {
        this.memberService = memberService;
        this.accountService = accountService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async login(signInDto) {
        const member = await this.memberService.signinAsync(signInDto);
        const user = new Object({
            id: member.id,
            accountId: member.accountId,
            username: member.username,
            nameHotel: member.account.nameHotel,
            type: member.account.type,
            expiredAt: member.account.expiredAt,
        });
        const accessToken = this.jwtService.sign(user);
        return Object.assign(Object.assign({}, user), { accessToken: accessToken });
    }
    async signup(signUpDto) {
        const account = await this.accountService.createAsync(signUpDto.account);
        const member = await this.memberService.createAsync(signUpDto.member, account.id);
        const user = new Object({
            id: member.id,
            accountId: account.id,
            expiredAt: moment().add(5, 'minutes').format('HH:mm:ss DD-MMM-YYYY'),
        });
        const mail = new Mail_1.CreateMailDto();
        mail.to = account.email;
        mail.from = 'HOTEL.VNNIX.COM <admin@vnnix.com>';
        mail.subject = 'Xác Minh Tài Khoản';
        mail.html = `<div>
				<p>Vui lòng kích vào nút bên dưới để xác minh tài khoản</p>
				<a href='http://localhost:3002/verify?type=signup&token=${(0, cryptoJs_1.encodeData)(user)}'>Xác minh</a>
		</div>`;
        this.mailService.sendUserConfirmation(mail);
        return 'Create Account Success';
    }
    async getProfile(user) {
        if (!user)
            throw new common_1.ForbiddenException('Forbidden !');
        const rs = await this.accountService.findOneAsync(user.accountId);
        console.log('user', user);
        delete user.iat;
        delete user.exp;
        user.expiredAt = rs.expiredAt;
        return user;
    }
    async createVerify() {
        const user = {
            name: 'Phan Tin Tuong',
            id: 1,
        };
        return (0, cryptoJs_1.encodeData)(user);
    }
    async accountVerify(encryptedData) {
        const decryptedData = (0, cryptoJs_1.decodeData)(encryptedData);
        if (decryptedData) {
            const flag = moment().isBefore(moment(decryptedData === null || decryptedData === void 0 ? void 0 : decryptedData.expiredAt));
            if (flag) {
            }
        }
        throw new common_1.BadRequestException('Verify fail!');
    }
};
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Member_1.SigninMemberDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('signup'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.UseGuards)(JwtGuardService_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('verify/create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createVerify", null);
__decorate([
    (0, common_1.Get)('verify/:encryptedData'),
    __param(0, (0, common_1.Param)('encryptedData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "accountVerify", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [MemberService_1.MemberService,
        AccountService_1.AccountService,
        jwt_1.JwtService,
        MailService_1.MailService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map
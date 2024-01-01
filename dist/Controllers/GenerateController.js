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
exports.GenerateController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const UnitService_1 = require("../services/UnitService");
const Unit_1 = require("../Entities/Dto/Unit");
const Unit_2 = require("../entities/Types/Unit");
const user_dto_1 = require("../Shared/user.dto");
const user_decorator_1 = require("../Shared/user.decorator");
const MailService_1 = require("../Services/MailService");
const Mail_1 = require("../Entities/Dto/Mail");
let GenerateController = class GenerateController {
    constructor(unitService, mailService) {
        this.unitService = unitService;
        this.mailService = mailService;
    }
    async unitsGenerate(user) {
        try {
            const item1 = new Unit_1.CreateUnitDto('Gói', Unit_2.UnitType.PRODUCT);
            const item2 = new Unit_1.CreateUnitDto('Hộp', Unit_2.UnitType.PRODUCT);
            const item3 = new Unit_1.CreateUnitDto('Thùng', Unit_2.UnitType.PRODUCT);
            const item4 = new Unit_1.CreateUnitDto('Kg', Unit_2.UnitType.PRODUCT);
            const item5 = new Unit_1.CreateUnitDto('Gram', Unit_2.UnitType.PRODUCT);
            const item7 = new Unit_1.CreateUnitDto('Lít', Unit_2.UnitType.PRODUCT);
            const item8 = new Unit_1.CreateUnitDto('Cái', Unit_2.UnitType.PRODUCT);
            const item9 = new Unit_1.CreateUnitDto('Gói', Unit_2.UnitType.SERVICE);
            const item10 = new Unit_1.CreateUnitDto('Hộp', Unit_2.UnitType.SERVICE);
            const item11 = new Unit_1.CreateUnitDto('Thùng', Unit_2.UnitType.SERVICE);
            const item12 = new Unit_1.CreateUnitDto('Kg', Unit_2.UnitType.SERVICE);
            const item13 = new Unit_1.CreateUnitDto('Gram', Unit_2.UnitType.SERVICE);
            const item14 = new Unit_1.CreateUnitDto('Lon', Unit_2.UnitType.SERVICE);
            const item15 = new Unit_1.CreateUnitDto('Phần', Unit_2.UnitType.SERVICE);
            const item16 = new Unit_1.CreateUnitDto('Cái', Unit_2.UnitType.SERVICE);
            const item17 = new Unit_1.CreateUnitDto('Chai', Unit_2.UnitType.SERVICE);
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
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async testMail(user) {
        try {
            const mail = new Mail_1.CreateMailDto();
            mail.to = 'tintuong95@gmail.com';
            mail.from = 'HOTEL.VNNIX.COM <admin@vnnix.com>';
            mail.subject = 'Xác nhận đăng ký tài khoản ';
            mail.html =
                "<div><h6>Vui lòng kích vào nút bên dưới để xác minh tài khoản</h6><a href='#h'>Xác minh</a></div>";
            const rs = await this.mailService.sendUserConfirmation(mail);
            return rs;
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async testLog(user) {
        try {
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async testRemoveList(ids, user) {
        try {
            this.unitService.removeListAsync(ids.list, user);
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Get)('units'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], GenerateController.prototype, "unitsGenerate", null);
__decorate([
    (0, common_1.Get)('test'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], GenerateController.prototype, "testMail", null);
__decorate([
    (0, common_1.Get)('log'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], GenerateController.prototype, "testLog", null);
__decorate([
    (0, common_1.Post)('test-remove-list'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], GenerateController.prototype, "testRemoveList", null);
GenerateController = __decorate([
    (0, common_1.Controller)('generate'),
    (0, swagger_1.ApiTags)('generate'),
    __metadata("design:paramtypes", [UnitService_1.UnitService,
        MailService_1.MailService])
], GenerateController);
exports.GenerateController = GenerateController;
//# sourceMappingURL=GenerateController.js.map
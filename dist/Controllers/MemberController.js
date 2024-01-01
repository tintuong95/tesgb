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
exports.MemberController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("../services/core");
const swagger_1 = require("@nestjs/swagger");
const Member_1 = require("../Entities/Dto/Member");
const user_dto_1 = require("../Shared/user.dto");
const user_decorator_1 = require("../Shared/user.decorator");
const JwtGuardService_1 = require("../Services/JwtGuardService");
let MemberController = class MemberController {
    constructor(memberService) {
        this.memberService = memberService;
    }
    async getAllMembers(request, user) {
        return await this.memberService.findAllAsync(request, user);
    }
    async getMemberDetails(id, user) {
        return await this.memberService.findOneAsync(id, user);
    }
    async createMember(createMemberDto, user) {
        return await this.memberService.createAsync(createMemberDto, user.accountId);
    }
    async updateMember(updateMemberDto, user, id) {
        return await this.memberService.updateAsync(id, updateMemberDto);
    }
    async removeMember(id, user) {
        return await this.memberService.removeAsync(id, user);
    }
    async restoreMember(id, user) {
        return await this.memberService.restoreAsync(id, user);
    }
    async deleteMember(id, user) {
        return await this.memberService.deleteAsync(id, user);
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "getAllMembers", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "getMemberDetails", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Member_1.CreateMemberDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "createMember", null);
__decorate([
    (0, common_1.Put)(':id/update'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Member_1.CreateMemberDto,
        user_dto_1.UserDto, String]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "updateMember", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "removeMember", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "restoreMember", null);
__decorate([
    (0, common_1.Delete)(':id/delete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "deleteMember", null);
MemberController = __decorate([
    (0, common_1.Controller)('member'),
    (0, swagger_1.ApiTags)('member'),
    (0, common_1.UseGuards)(JwtGuardService_1.JwtAuthGuard),
    __metadata("design:paramtypes", [core_1.MemberService])
], MemberController);
exports.MemberController = MemberController;
//# sourceMappingURL=MemberController.js.map
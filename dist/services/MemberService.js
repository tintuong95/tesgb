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
var MemberService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("../entities/core");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
const relation_1 = require("../contants/relation");
let MemberService = MemberService_1 = class MemberService {
    constructor(memberRepository) {
        this.memberRepository = memberRepository;
        this.logger = new common_1.Logger(MemberService_1.name);
    }
    async findAllAsync(request, user) {
        try {
            return await this.memberRepository.find();
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOneAsync(id, user) {
        try {
            const result = await this.memberRepository.findOne({
                where: { id, accountId: user.accountId },
            });
            if (!result)
                throw new common_2.NotFoundException('Member Id ' + id + ' Not Found !');
            return result;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAsync(createMemberDto, accountId) {
        try {
            createMemberDto.accountId = accountId;
            console.log('hihi', createMemberDto);
            const result = this.memberRepository.create(createMemberDto);
            return await this.memberRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAsync(id, updateMemberDto) {
        try {
            const result = await this.memberRepository.findOne({ where: { id } });
            if (!result)
                throw new common_2.NotFoundException('Member Id ' + id + ' Not Found !');
            _(updateMemberDto).forEach((val, key) => {
                if (val)
                    result[key] = val;
            });
            return this.memberRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeAsync(id, user) {
        const result = await this.memberRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Deleted Member Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Member Id ' + id + ' Not Found !');
    }
    async restoreAsync(id, user) {
        const result = await this.memberRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Restore Member Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Member Id ' + id + ' Not Found !');
    }
    async deleteAsync(id, user) {
        const result = await this.memberRepository.delete(id);
        if (result.affected > 0)
            return 'Deleted Member Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Member Id ' + id + ' Not Found !');
    }
    async signupAsync(signupDto) {
        try {
            const result = this.memberRepository.create(signupDto);
            return await this.memberRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async signinAsync(signinDto) {
        try {
            const result = await this.memberRepository.findOne({
                where: { username: signinDto.username },
                relations: [relation_1.ACCOUNT_RELATION],
            });
            console.log('Tried to access a post that does not exist');
            if (!result)
                throw new common_2.NotFoundException('Member ' + signinDto.username + ' Not Found !');
            else if (result && result.comparePassword(signinDto.password)) {
                return result;
            }
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
MemberService = MemberService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(core_1.Member)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MemberService);
exports.MemberService = MemberService;
//# sourceMappingURL=MemberService.js.map
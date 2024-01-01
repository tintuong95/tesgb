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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("../entities/core");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
let ReportService = class ReportService {
    constructor(reportRepository) {
        this.reportRepository = reportRepository;
    }
    async findAllAsync(request, user) {
        try {
            return await this.reportRepository.find();
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOneAsync(id, user) {
        try {
            const result = await this.reportRepository.findOne({
                where: { id, accountId: user.accountId },
            });
            if (!result)
                throw new common_2.NotFoundException('Report Id ' + id + ' Not Found !');
            return result;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAsync(createReportDto, user) {
        try {
            const result = this.reportRepository.create(createReportDto);
            return await this.reportRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAsync(id, updateReportDto, user) {
        try {
            const result = await this.reportRepository.findOne({ where: { id } });
            if (!result)
                throw new common_2.NotFoundException('Report Id ' + id + ' Not Found !');
            _(updateReportDto).forEach((val, key) => {
                if (val)
                    result[key] = val;
            });
            return this.reportRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeAsync(id, user) {
        const result = await this.reportRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Deleted Report Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Report Id ' + id + ' Not Found !');
    }
    async restoreAsync(id, user) {
        const result = await this.reportRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Restore Report Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Report Id ' + id + ' Not Found !');
    }
    async deleteAsync(id, user) {
        const result = await this.reportRepository.delete(id);
        if (result.affected > 0)
            return 'Deleted Report Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Report Id ' + id + ' Not Found !');
    }
};
ReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(core_1.Report)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReportService);
exports.ReportService = ReportService;
//# sourceMappingURL=ReportService.js.map
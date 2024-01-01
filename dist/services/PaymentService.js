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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("../entities/core");
const typeorm_2 = require("typeorm");
const core_2 = require("../Entities/Dto/core");
const _ = require("lodash");
const pagination_1 = require("../Utils/pagination");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const Payment_1 = require("../entities/Types/Payment");
const payos_1 = require("../Utils/payos");
const price_1 = require("../Contants/price");
const moment = require("moment");
let PaymentService = class PaymentService {
    constructor(paymentRepository, configService, httpService) {
        this.paymentRepository = paymentRepository;
        this.configService = configService;
        this.httpService = httpService;
        this._url = '';
        this._client_id = '';
        this._api_key = '';
        this._checksum_key = '';
        this._domain_frontend = '';
        this._url = this.configService.get('payos.url');
        this._client_id = this.configService.get('payos.client_id');
        this._api_key = this.configService.get('payos.api_key');
        this._checksum_key = this.configService.get('payos.checksum_key');
        this._domain_frontend = this.configService.get('domain.frontend');
    }
    async findAllAsync(request, user) {
        try {
            const { skip, take, currentPage, perPage } = (0, pagination_1.queryHandler)(request.query);
            const result = await this.paymentRepository.findAndCount({
                where: {
                    accountId: user.accountId,
                    status: Payment_1.PAYMENT_STATUS.Success,
                },
                withDeleted: false,
                order: {
                    createdAt: { direction: 'desc' },
                },
                take,
                skip,
            });
            if (result[1] == 0)
                return new common_2.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
            return (0, pagination_1.pagination)(request, result, currentPage, perPage);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOneAsync(id, user) {
        try {
            const result = await this.paymentRepository.findOne({
                where: { id, accountId: user.accountId },
            });
            if (!result)
                throw new common_2.NotFoundException('Payment Id ' + id + ' Not Found !');
            return result;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAsync(createPaymentOptionDto, user) {
        var _a;
        try {
            const newPayment = new core_2.CreatePaymentDto();
            newPayment.accountId = user.accountId;
            newPayment.amount =
                price_1.PRICE_OPTION_TOTAL[createPaymentOptionDto.type][createPaymentOptionDto.option];
            newPayment.option = createPaymentOptionDto.option;
            newPayment.type = createPaymentOptionDto.type;
            newPayment.description = 'TEST';
            newPayment.expiredAt = new Date(moment()
                .add(price_1.TIME_OPTION[createPaymentOptionDto.option], 'months')
                .format('DD-MMM-YYYY HH:mm:ss'));
            const payment = await this.paymentRepository.save(newPayment);
            let data = {
                orderCode: Number(payment.id),
                amount: Number(payment.amount),
                description: payment.description || 'Not Found',
                cancelUrl: this._domain_frontend + `/tai-khoan/nang-cap`,
                returnUrl: this._domain_frontend + `/tai-khoan/nang-cap`,
            };
            const signature = (0, payos_1.generateHmacSha256)(data, this._checksum_key);
            data = Object.assign(Object.assign({}, data), { signature });
            const headers = {
                'x-client-id': this._client_id,
                'x-api-key': this._api_key,
            };
            const result = await this.httpService.axiosRef.post(this._url + '/v2/payment-requests', data, { headers });
            if (result.status === 200) {
                if (((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.code) == '00') {
                    payment.signature = signature;
                    this.paymentRepository.save(payment);
                    return result === null || result === void 0 ? void 0 : result.data;
                }
            }
            throw new common_2.HttpException('Create payment fail', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAsync(id, updatePaymentDto, user) {
        try {
            const result = await this.paymentRepository.findOne({ where: { id } });
            if (!result)
                throw new common_2.NotFoundException('Payment Id ' + id + ' Not Found !');
            if (user.accountId != result.accountId)
                throw new common_1.UnauthorizedException('Unauthorized payment');
            _(updatePaymentDto).forEach((val, key) => {
                if (val)
                    result[key] = val;
            });
            return this.paymentRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeAsync(id, user) {
        const result = await this.paymentRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Deleted Payment Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Payment Id ' + id + ' Not Found !');
    }
    async restoreAsync(id, user) {
        const result = await this.paymentRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Restore Payment Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Payment Id ' + id + ' Not Found !');
    }
    async deleteAsync(id, user) {
        const result = await this.paymentRepository.delete(id);
        if (result.affected > 0)
            return 'Deleted Payment Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Payment Id ' + id + ' Not Found !');
    }
    async checkPaymentRequest(id, user) {
        var _a, _b;
        try {
            const headers = {
                'x-client-id': this._client_id,
                'x-api-key': this._api_key,
            };
            const result = await this.httpService.axiosRef.get(this._url + '/v2/payment-requests/' + id, { headers });
            if ((result.data.code = '00')) {
                const payment = await this.paymentRepository.findOne({
                    where: { id: (_b = (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.orderCode, accountId: user.accountId },
                });
                if (payment) {
                    payment.status = Payment_1.PAYMENT_STATUS.Success;
                    this.paymentRepository.save(payment);
                }
                return payment;
            }
            return false;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(core_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        axios_1.HttpService])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=PaymentService.js.map
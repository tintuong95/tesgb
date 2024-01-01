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
exports.PriceController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("../services/core");
const core_2 = require("../Entities/Dto/core");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../Shared/user.decorator");
const user_dto_1 = require("../Shared/user.dto");
const JwtGuardService_1 = require("../Services/JwtGuardService");
const PriceItem_1 = require("../entities/Types/PriceItem");
let PriceController = class PriceController {
    constructor(priceService, priceItemService) {
        this.priceService = priceService;
        this.priceItemService = priceItemService;
    }
    async getAllPrices(request, user) {
        return await this.priceService.findAllAsync(request, user);
    }
    async getPriceDetails(id, user) {
        return await this.priceService.findOneAsync(id, user);
    }
    async createPrice(createPriceAllDto, user) {
        const newPrice = new core_2.CreatePriceDto();
        newPrice.name = createPriceAllDto.name;
        const createPrice = await this.priceService.createAsync(newPrice, user);
        const priceHours = new core_2.CreatePriceItemDto();
        priceHours.accountId = user.accountId;
        priceHours.priceId = createPrice.id;
        priceHours.priceRoom = createPriceAllDto.priceHour;
        priceHours.type = PriceItem_1.PriceItemType.HourPrice;
        const priceHourMore = new core_2.CreatePriceItemDto();
        priceHourMore.accountId = user.accountId;
        priceHourMore.priceId = createPrice.id;
        priceHourMore.priceRoom = createPriceAllDto.priceMore;
        priceHourMore.type = PriceItem_1.PriceItemType.MoreHoursPrice;
        const priceNight = new core_2.CreatePriceItemDto();
        priceNight.accountId = user.accountId;
        priceNight.priceId = createPrice.id;
        priceNight.priceRoom = createPriceAllDto.priceNight;
        priceNight.checkInAt = createPriceAllDto.checkInNight;
        priceNight.checkOutAt = createPriceAllDto.checkOutNight;
        priceNight.type = PriceItem_1.PriceItemType.NightPrice;
        const priceDay = new core_2.CreatePriceItemDto();
        priceDay.accountId = user.accountId;
        priceDay.priceId = createPrice.id;
        priceDay.priceRoom = createPriceAllDto.priceDay;
        priceDay.checkInAt = createPriceAllDto.checkInDay;
        priceDay.checkOutAt = createPriceAllDto.checkOutDay;
        priceDay.type = PriceItem_1.PriceItemType.DayPrice;
        await this.priceItemService.createAsync([
            priceHours,
            priceHourMore,
            priceNight,
            priceDay,
        ]);
        return createPrice;
    }
    async updatePrice(updatePriceDto, user, id) {
        try {
            if (updatePriceDto.name || updatePriceDto.status) {
                const update = new core_2.UpdatePriceDto();
                if (updatePriceDto.name)
                    update.name = updatePriceDto.name;
                if (updatePriceDto.status)
                    update.status = updatePriceDto.status;
                const rs = await this.priceService.updateAsync(id, update, user);
            }
            if (updatePriceDto.priceDay) {
                const update = new core_2.UpdatePriceItemDto();
                update.priceRoom = updatePriceDto.priceDay;
                await this.priceItemService.updateAsync(id, PriceItem_1.PriceItemType.DayPrice, update);
            }
            if (updatePriceDto.priceNight) {
                const update = new core_2.UpdatePriceItemDto();
                update.priceRoom = updatePriceDto.priceNight;
                await this.priceItemService.updateAsync(id, PriceItem_1.PriceItemType.NightPrice, update);
            }
            if (updatePriceDto.priceHour) {
                const update = new core_2.UpdatePriceItemDto();
                update.priceRoom = updatePriceDto.priceHour;
                await this.priceItemService.updateAsync(id, PriceItem_1.PriceItemType.HourPrice, update);
            }
            if (updatePriceDto.priceHour) {
                const update = new core_2.UpdatePriceItemDto();
                update.priceRoom = updatePriceDto.priceMore;
                await this.priceItemService.updateAsync(id, PriceItem_1.PriceItemType.MoreHoursPrice, update);
            }
            return (0, common_1.HttpCode)(common_1.HttpStatus.OK);
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removePrice(id, user) {
        return await this.priceService.removeAsync(id, user);
    }
    async restorePrice(id, user) {
        return await this.priceService.restoreAsync(id, user);
    }
    async deletePrice(id, user) {
        return await this.priceService.deleteAsync(id, user);
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PriceController.prototype, "getAllPrices", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PriceController.prototype, "getPriceDetails", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_2.CreatePriceAllDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PriceController.prototype, "createPrice", null);
__decorate([
    (0, common_1.Put)(':id/update'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_2.UpdatePriceAllDto,
        user_dto_1.UserDto, String]),
    __metadata("design:returntype", Promise)
], PriceController.prototype, "updatePrice", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PriceController.prototype, "removePrice", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PriceController.prototype, "restorePrice", null);
__decorate([
    (0, common_1.Delete)(':id/delete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PriceController.prototype, "deletePrice", null);
PriceController = __decorate([
    (0, common_1.Controller)('price'),
    (0, swagger_1.ApiTags)('price'),
    (0, common_1.UseGuards)(JwtGuardService_1.JwtAuthGuard),
    __metadata("design:paramtypes", [core_1.PriceService,
        core_1.PriceItemService])
], PriceController);
exports.PriceController = PriceController;
//# sourceMappingURL=PriceController.js.map
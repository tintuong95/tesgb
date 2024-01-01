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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Price = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const RoomType_1 = require("./RoomType");
const relation_1 = require("../contants/relation");
const TYPE = require("./Types/core");
const Account_1 = require("./Account");
const PriceItem_1 = require("./PriceItem");
let Price = class Price extends typeorm_1.BaseEntity {
    generateId() {
        this.id = Math.random().toString(36).slice(2, 36);
    }
};
_a = relation_1.ROOM_TYPE_RELATION, _b = relation_1.PRICE_ITEM_RELATION, _c = relation_1.ACCOUNT_RELATION;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Price.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Price.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Price.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TYPE.PriceStatus,
        default: TYPE.PriceStatus.Ready,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Price.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Price.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Price.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Price.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Price.prototype, "generateId", null);
__decorate([
    (0, typeorm_1.OneToMany)(() => RoomType_1.RoomType, (roomType) => roomType[relation_1.PRICE_RELATION]),
    __metadata("design:type", Array)
], Price.prototype, _a, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PriceItem_1.PriceItem, (PriceItem) => PriceItem[relation_1.PRICE_RELATION]),
    __metadata("design:type", Array)
], Price.prototype, _b, void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Account_1.Account, (Account) => Account[relation_1.PRICE_RELATION]),
    __metadata("design:type", Account_1.Account)
], Price.prototype, _c, void 0);
Price = __decorate([
    (0, typeorm_1.Entity)({ name: 'Prices' })
], Price);
exports.Price = Price;
//# sourceMappingURL=Price.js.map
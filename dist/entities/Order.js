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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const TYPE = require("./Types/core");
const ServiceOrder_1 = require("./ServiceOrder");
const relation_1 = require("../contants/relation");
const CustomerOrder_1 = require("./CustomerOrder");
const RoomOrder_1 = require("./RoomOrder");
const Account_1 = require("./Account");
const OtherOrder_1 = require("./OtherOrder");
let Order = class Order extends typeorm_1.BaseEntity {
    generateId() {
        this.id = Math.random().toString(36).slice(2, 36);
    }
};
_a = relation_1.CUSTOMER_ORDER_RELATION, _b = relation_1.ROOM_ORDER_RELATION, _c = relation_1.SERVICE_ORDER_RELATION, _d = relation_1.OTHER_ORDER_RELATION, _e = relation_1.ACCOUNT_RELATION;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Order.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TYPE.OrderStatus,
        default: TYPE.OrderStatus.Unconfirmed,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Order.prototype, "checkInDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Order.prototype, "checkOutDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Order.prototype, "numDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Order.prototype, "numNights", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Order.prototype, "numHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Order.prototype, "numMoreHours", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Order.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Order.prototype, "generateId", null);
__decorate([
    (0, typeorm_1.OneToMany)(() => CustomerOrder_1.CustomerOrder, (customerOrder) => customerOrder[relation_1.ORDER_RELATION]),
    __metadata("design:type", Array)
], Order.prototype, _a, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RoomOrder_1.RoomOrder, (roomOrder) => roomOrder[relation_1.ORDER_RELATION]),
    __metadata("design:type", Array)
], Order.prototype, _b, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ServiceOrder_1.ServiceOrder, (roomOrder) => roomOrder[relation_1.ORDER_RELATION]),
    __metadata("design:type", Array)
], Order.prototype, _c, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OtherOrder_1.OtherOrder, (OtherOrder) => OtherOrder[relation_1.ORDER_RELATION]),
    __metadata("design:type", Array)
], Order.prototype, _d, void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Account_1.Account, (Account) => Account[relation_1.ORDER_RELATION]),
    __metadata("design:type", Account_1.Account)
], Order.prototype, _e, void 0);
Order = __decorate([
    (0, typeorm_1.Entity)({ name: 'Orders' })
], Order);
exports.Order = Order;
//# sourceMappingURL=Order.js.map
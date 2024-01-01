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
exports.CustomerOrder = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const relation_1 = require("../contants/relation");
const Order_1 = require("./Order");
const Customer_1 = require("./Customer");
const Account_1 = require("./Account");
let CustomerOrder = class CustomerOrder extends typeorm_1.BaseEntity {
    generateId() {
        this.id = Math.random().toString(36).slice(2, 36);
    }
};
_a = relation_1.ORDER_RELATION, _b = relation_1.CUSTOMER_RELATION, _c = relation_1.ACCOUNT_RELATION;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CustomerOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CustomerOrder.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CustomerOrder.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CustomerOrder.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CustomerOrder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CustomerOrder.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CustomerOrder.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomerOrder.prototype, "generateId", null);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Order_1.Order, (Order) => Order[relation_1.CUSTOMER_ORDER_RELATION]),
    __metadata("design:type", Order_1.Order)
], CustomerOrder.prototype, _a, void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Customer_1.Customer, (Customer) => Customer[relation_1.CUSTOMER_ORDER_RELATION]),
    __metadata("design:type", Customer_1.Customer)
], CustomerOrder.prototype, _b, void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Account_1.Account, (Account) => Account[relation_1.CUSTOMER_ORDER_RELATION]),
    __metadata("design:type", Account_1.Account)
], CustomerOrder.prototype, _c, void 0);
CustomerOrder = __decorate([
    (0, typeorm_1.Entity)({ name: 'CustomerOrders' })
], CustomerOrder);
exports.CustomerOrder = CustomerOrder;
//# sourceMappingURL=CustomerOrder.js.map
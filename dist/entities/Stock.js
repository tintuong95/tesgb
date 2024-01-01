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
exports.Stock = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const Account_1 = require("./Account");
const relation_1 = require("../contants/relation");
const Product_1 = require("./Product");
const StockHistory_1 = require("./StockHistory");
let Stock = class Stock extends typeorm_1.BaseEntity {
    generateId() {
        this.id = Math.random().toString(36).slice(2, 36);
    }
};
_a = relation_1.STOCK_HISTORY_RELATION, _b = relation_1.PRODUCT_RELATION, _c = relation_1.ACCOUNT_RELATION;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Stock.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Stock.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Stock.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Stock.prototype, "inventory", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Stock.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Stock.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Stock.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Stock.prototype, "generateId", null);
__decorate([
    (0, typeorm_1.OneToMany)(() => StockHistory_1.StockHistory, (StockHistory) => StockHistory[relation_1.STOCK_RELATION]),
    __metadata("design:type", Array)
], Stock.prototype, _a, void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Product_1.Product, (product) => product[relation_1.STOCK_RELATION]),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Product_1.Product)
], Stock.prototype, _b, void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Account_1.Account, (Account) => Account[relation_1.STOCK_RELATION]),
    __metadata("design:type", Account_1.Account)
], Stock.prototype, _c, void 0);
Stock = __decorate([
    (0, typeorm_1.Entity)({ name: 'Stocks' })
], Stock);
exports.Stock = Stock;
//# sourceMappingURL=Stock.js.map
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const swagger_1 = require("@nestjs/swagger");
const Stock_1 = require("./Stock");
const relation_1 = require("../contants/relation");
const StockHistory_1 = require("./StockHistory");
const Account_1 = require("./Account");
const Revenue_1 = require("./Revenue");
let Member = class Member extends typeorm_1.BaseEntity {
    generateId() {
        this.id = Math.random().toString(36).slice(2, 36);
    }
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, +process.env.SALTROUNDS || 10);
    }
    comparePassword(attempt) {
        return bcrypt.compareSync(attempt, this.password);
    }
};
_a = relation_1.STOCK_RELATION, _b = relation_1.STOCK_HISTORY_RELATION, _c = relation_1.ACCOUNT_RELATION, _d = relation_1.REVENUE_RELATION;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Member.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Member.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: false, unique: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Member.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Member.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Member.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Member.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Member.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Member.prototype, "generateId", null);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Member.prototype, "hashPassword", null);
__decorate([
    (0, typeorm_1.OneToMany)(() => Stock_1.Stock, (stock) => stock[relation_1.MEMBER_RELATION]),
    __metadata("design:type", Array)
], Member.prototype, _a, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => StockHistory_1.StockHistory, (stockHistory) => stockHistory[relation_1.MEMBER_RELATION]),
    __metadata("design:type", Array)
], Member.prototype, _b, void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Account_1.Account, (Account) => Account[relation_1.MEMBER_RELATION]),
    __metadata("design:type", Account_1.Account)
], Member.prototype, _c, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Revenue_1.Revenue, (Revenue) => Revenue[relation_1.MEMBER_RELATION]),
    __metadata("design:type", Array)
], Member.prototype, _d, void 0);
Member = __decorate([
    (0, typeorm_1.Entity)({ name: 'Members' })
], Member);
exports.Member = Member;
//# sourceMappingURL=Member.js.map
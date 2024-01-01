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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Revenue = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const relation_1 = require("../contants/relation");
const Account_1 = require("./Account");
const Member_1 = require("./Member");
const TYPE = require("./Types/core");
let Revenue = class Revenue extends typeorm_1.BaseEntity {
    generateId() {
        this.id = Math.random().toString(36).slice(2, 36);
    }
};
_a = relation_1.ACCOUNT_RELATION, _b = relation_1.MEMBER_RELATION;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Revenue.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Revenue.prototype, "referenceId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TYPE.REVENUE_TYPE,
        default: TYPE.REVENUE_TYPE.OTHER,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Revenue.prototype, "referenceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Revenue.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Revenue.prototype, "memberId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Revenue.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TYPE.REVENUE_STATE,
        default: TYPE.REVENUE_STATE.REVENUE,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Revenue.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Revenue.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Revenue.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Revenue.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Revenue.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Revenue.prototype, "generateId", null);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Account_1.Account, (Account) => Account[relation_1.REVENUE_RELATION]),
    __metadata("design:type", Account_1.Account)
], Revenue.prototype, _a, void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Member_1.Member, (Member) => Member[relation_1.REVENUE_RELATION]),
    __metadata("design:type", Member_1.Member)
], Revenue.prototype, _b, void 0);
Revenue = __decorate([
    (0, typeorm_1.Entity)({ name: 'Revenues' })
], Revenue);
exports.Revenue = Revenue;
//# sourceMappingURL=Revenue.js.map
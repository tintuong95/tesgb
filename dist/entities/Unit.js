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
exports.Unit = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const TYPE = require("./Types/core");
const relation_1 = require("../contants/relation");
const Product_1 = require("./Product");
const Service_1 = require("./Service");
let Unit = class Unit extends typeorm_1.BaseEntity {
    generateId() {
        this.id = Math.random().toString(36).slice(2, 36);
    }
};
_a = relation_1.PRODUCT_RELATION, _b = relation_1.SERVICE_RELATION;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Unit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Unit.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TYPE.UnitType,
        default: TYPE.UnitType.PRODUCT,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Unit.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Unit.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Unit.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Unit.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Unit.prototype, "generateId", null);
__decorate([
    (0, typeorm_1.OneToMany)(() => Product_1.Product, (Product) => Product[relation_1.UNIT_RELATION]),
    __metadata("design:type", Array)
], Unit.prototype, _a, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Service_1.Service, (Service) => Service[relation_1.UNIT_RELATION]),
    __metadata("design:type", Array)
], Unit.prototype, _b, void 0);
Unit = __decorate([
    (0, typeorm_1.Entity)({ name: 'Units' })
], Unit);
exports.Unit = Unit;
//# sourceMappingURL=Unit.js.map
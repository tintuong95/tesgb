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
exports.Service = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const TYPE = require("./Types/core");
const ServiceType_1 = require("./ServiceType");
const relation_1 = require("../contants/relation");
const ServiceOrder_1 = require("./ServiceOrder");
const Account_1 = require("./Account");
const Unit_1 = require("./Unit");
let Service = class Service extends typeorm_1.BaseEntity {
    generateId() {
        this.id = Math.random().toString(36).slice(2, 36);
    }
};
_a = relation_1.SERVICE_TYPE_RELATION, _b = relation_1.SERVICE_ORDER_RELATION, _c = relation_1.ACCOUNT_RELATION, _d = relation_1.UNIT_RELATION;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Service.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Service.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Service.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Service.prototype, "serviceTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Service.prototype, "unitId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Service.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Service.prototype, "inventory", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TYPE.ServiceStatus,
        default: TYPE.ServiceStatus.Ready,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Service.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Service.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Service.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Service.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Service.prototype, "generateId", null);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ServiceType_1.ServiceType, (serviceType) => serviceType[relation_1.SERVICE_RELATION]),
    __metadata("design:type", ServiceType_1.ServiceType)
], Service.prototype, _a, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ServiceOrder_1.ServiceOrder, (serviceOrder) => serviceOrder[relation_1.SERVICE_RELATION]),
    __metadata("design:type", Array)
], Service.prototype, _b, void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Account_1.Account, (Account) => Account[relation_1.SERVICE_RELATION]),
    __metadata("design:type", Account_1.Account)
], Service.prototype, _c, void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Unit_1.Unit, (Unit) => Unit[relation_1.SERVICE_RELATION]),
    __metadata("design:type", Unit_1.Unit)
], Service.prototype, _d, void 0);
Service = __decorate([
    (0, typeorm_1.Entity)({ name: 'Services' })
], Service);
exports.Service = Service;
//# sourceMappingURL=Service.js.map
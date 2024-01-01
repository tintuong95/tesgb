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
exports.RoomType = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const Room_1 = require("./Room");
const relation_1 = require("../contants/relation");
const Price_1 = require("./Price");
const Account_1 = require("./Account");
const TYPE = require("./Types/core");
let RoomType = class RoomType extends typeorm_1.BaseEntity {
    generateId() {
        this.id = Math.random().toString(36).slice(2, 36);
    }
};
_a = relation_1.ROOM_RELATION, _b = relation_1.PRICE_RELATION, _c = relation_1.ACCOUNT_RELATION;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RoomType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RoomType.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RoomType.prototype, "priceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RoomType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RoomType.prototype, "quality", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RoomType.prototype, "bed", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RoomType.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TYPE.BedType,
        default: TYPE.BedType.One,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RoomType.prototype, "bedType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], RoomType.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], RoomType.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], RoomType.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoomType.prototype, "generateId", null);
__decorate([
    (0, typeorm_1.OneToMany)(() => Room_1.Room, (room) => room[relation_1.ROOM_TYPE_RELATION]),
    __metadata("design:type", Array)
], RoomType.prototype, _a, void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Price_1.Price, (room) => room[relation_1.ROOM_TYPE_RELATION]),
    __metadata("design:type", Price_1.Price)
], RoomType.prototype, _b, void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Account_1.Account, (Account) => Account[relation_1.ROOM_TYPE_RELATION]),
    __metadata("design:type", Account_1.Account)
], RoomType.prototype, _c, void 0);
RoomType = __decorate([
    (0, typeorm_1.Entity)({ name: 'RoomTypes' })
], RoomType);
exports.RoomType = RoomType;
//# sourceMappingURL=RoomType.js.map
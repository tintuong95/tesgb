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
exports.Room = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const RoomType_1 = require("./RoomType");
const relation_1 = require("../contants/relation");
const Floor_1 = require("./Floor");
const TYPE = require("./Types/core");
const Account_1 = require("./Account");
const RoomOrder_1 = require("./RoomOrder");
let Room = class Room extends typeorm_1.BaseEntity {
    generateId() {
        this.id = Math.random().toString(36).slice(2, 36);
    }
};
_a = relation_1.ROOM_TYPE_RELATION, _b = relation_1.FLOOR_RELATION, _c = relation_1.ACCOUNT_RELATION, _d = relation_1.ROOM_ORDER_RELATION;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Room.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Room.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Room.prototype, "floorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Room.prototype, "roomTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Room.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Room.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TYPE.RoomStatus,
        default: TYPE.RoomStatus.Ready,
    }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Room.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Room.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Room.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], Room.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Room.prototype, "generateId", null);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RoomType_1.RoomType, (RoomType) => RoomType[relation_1.ROOM_RELATION]),
    __metadata("design:type", RoomType_1.RoomType)
], Room.prototype, _a, void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Floor_1.Floor, (Floor) => Floor[relation_1.ROOM_RELATION]),
    __metadata("design:type", Floor_1.Floor)
], Room.prototype, _b, void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Account_1.Account, (Account) => Account[relation_1.ROOM_RELATION]),
    __metadata("design:type", Account_1.Account)
], Room.prototype, _c, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RoomOrder_1.RoomOrder, (RoomOrder) => RoomOrder[relation_1.ROOM_RELATION]),
    __metadata("design:type", Array)
], Room.prototype, _d, void 0);
Room = __decorate([
    (0, typeorm_1.Entity)({ name: 'Rooms' })
], Room);
exports.Room = Room;
//# sourceMappingURL=Room.js.map
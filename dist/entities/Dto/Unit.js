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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUnitDto = exports.CreateUnitDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const TYPE = require("../Types/core");
class CreateUnitDto {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateUnitDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(TYPE.UnitType),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CreateUnitDto.prototype, "type", void 0);
exports.CreateUnitDto = CreateUnitDto;
class UpdateUnitDto extends (0, mapped_types_1.PartialType)(CreateUnitDto) {
}
exports.UpdateUnitDto = UpdateUnitDto;
//# sourceMappingURL=Unit.js.map
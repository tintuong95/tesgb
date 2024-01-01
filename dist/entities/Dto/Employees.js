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
exports.UpdateEmployeeDto = exports.CreateEmployeeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const TYPE = require("../../entities/Types/core");
class CreateEmployeeDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "idCard", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(TYPE.GENDER_TYPE),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CreateEmployeeDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CreateEmployeeDto.prototype, "salary", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "position", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "hireDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "accountId", void 0);
exports.CreateEmployeeDto = CreateEmployeeDto;
class UpdateEmployeeDto extends (0, swagger_1.PartialType)(CreateEmployeeDto) {
}
exports.UpdateEmployeeDto = UpdateEmployeeDto;
//# sourceMappingURL=Employees.js.map
import * as TYPE from '../Types/core';
export declare class CreateUnitDto {
    constructor(name: string, type: TYPE.UnitType);
    name: string;
    type: TYPE.UnitType;
}
declare const UpdateUnitDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUnitDto>>;
export declare class UpdateUnitDto extends UpdateUnitDto_base {
}
export {};

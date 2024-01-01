import { ValidationError } from '@nestjs/common';
export declare class DtoValidationError {
    validationErrors: ValidationError[];
    constructor(errors: any);
}

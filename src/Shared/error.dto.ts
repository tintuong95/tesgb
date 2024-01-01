import {ValidationError} from '@nestjs/common';

export class DtoValidationError {
	validationErrors: ValidationError[];

	constructor(errors) {
		this.validationErrors = errors;
	}
}

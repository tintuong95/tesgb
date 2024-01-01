import {ApiProperty, PartialType} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsNumber, IsString, MaxLength} from 'class-validator';

export class CreatedCustomerOrderDto {
	@IsString()
	@ApiProperty()
	@Expose()
	orderId: string;

	@IsString()
	@ApiProperty()
	@Expose()
	customerId: string;

	@IsString()
	@ApiProperty()
	@Expose()
	@MaxLength(200)
	accountId: string;
}

export class UpdatedCustomerOrderDto extends PartialType(
	CreatedCustomerOrderDto
) {}

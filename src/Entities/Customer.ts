import {
	Entity,
	BeforeInsert,
	Column,
	PrimaryColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	BaseEntity,
	ManyToOne,
} from 'typeorm';

import {ApiProperty} from '@nestjs/swagger';
import {Account} from './Account';
import {ACCOUNT_RELATION, CUSTOMER_RELATION} from '@contants/relation';
import * as TYPE from './Types/core';
@Entity({name: 'Customers'})
export class Customer extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({length: 100, nullable: true})
	@ApiProperty()
	firstName: string;

	@Column({length: 100, nullable: true})
	@ApiProperty()
	lastName: string;

	@Column({length: 200, nullable: true})
	@ApiProperty()
	address: string;

	@Column({length: 20, nullable: true})
	@ApiProperty()
	phone: string;

	@Column({length: 50, nullable: true})
	email: string;

	@Column({length: 50, nullable: true})
	@ApiProperty()
	birthday: string;

	@Column({length: 20, nullable: true})
	@ApiProperty()
	idCard: string;

	@Column({length: 200, nullable: true})
	@ApiProperty()
	note: string;

	@Column({
		type: 'enum',
		enum: TYPE.GENDER,
		default: TYPE.GENDER.MALE,
	})
	@ApiProperty()
	gender: TYPE.GENDER;

	@CreateDateColumn()
	@ApiProperty()
	createdAt: Date;

	@UpdateDateColumn()
	@ApiProperty()
	updatedAt: Date;

	@DeleteDateColumn()
	@ApiProperty()
	deletedAt: Date;

	@BeforeInsert()
	generateId() {
		this.id = Math.random().toString(36).slice(2, 36);
	}

	@ManyToOne(() => Account, (Account) => Account[CUSTOMER_RELATION])
	[ACCOUNT_RELATION]: Account;
}

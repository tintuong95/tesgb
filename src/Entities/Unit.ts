import {
	Entity,
	BeforeInsert,
	Column,
	PrimaryColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	BaseEntity,
	OneToMany,
	ManyToOne,
	OneToOne,
	JoinColumn,
} from 'typeorm';

import {ApiProperty} from '@nestjs/swagger';
import * as TYPE from './Types/core';
import {ServiceOrder} from './ServiceOrder';
import {
	ACCOUNT_RELATION,
	CUSTOMER_ORDER_RELATION,
	ORDER_RELATION,
	PAYMENT_RELATION,
	REVENUE_RELATION,
	ROOM_ORDER_RELATION,
	SERVICE_ORDER_RELATION,
	UNIT_RELATION,
	PRODUCT_RELATION,
	SERVICE_RELATION,
} from '@contants/relation';
import {generateCode} from '@util/generate';
import {CustomerOrder} from './CustomerOrder';
import {Payment} from './Payment';
import {RoomOrder} from './RoomOrder';
import {Account} from './Account';
import {Revenue} from './Revenue';
import {Product} from './Product';
import {Service} from './Service';

@Entity({name: 'Units'})
export class Unit extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({nullable: false})
	@ApiProperty()
	name: string;

	@Column({
		type: 'enum',
		enum: TYPE.UnitType,
		default: TYPE.UnitType.PRODUCT,
	})
	@ApiProperty()
	type: TYPE.UnitType;

	// @Column({nullable: false})
	// @ApiProperty()
	// accountId: string;

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

	@OneToMany(() => Product, (Product) => Product[UNIT_RELATION])
	[PRODUCT_RELATION]: Product[];

	@OneToMany(() => Service, (Service) => Service[UNIT_RELATION])
	[SERVICE_RELATION]: Service[];

	// @ManyToOne(() => Account, (Account) => Account[UNIT_RELATION])
	// [ACCOUNT_RELATION]: Account;
}

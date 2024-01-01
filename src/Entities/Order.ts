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
	OTHER_ORDER_RELATION,
	PAYMENT_RELATION,
	REVENUE_RELATION,
	ROOM_ORDER_RELATION,
	SERVICE_ORDER_RELATION,
} from '@contants/relation';
import {generateCode} from '@util/generate';
import {CustomerOrder} from './CustomerOrder';
import {Payment} from './Payment';
import {RoomOrder} from './RoomOrder';
import {Account} from './Account';
import {Revenue} from './Revenue';
import {OtherOrder} from './OtherOrder';

@Entity({name: 'Orders'})
export class Order extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({
		type: 'enum',
		enum: TYPE.OrderStatus,
		default: TYPE.OrderStatus.Unconfirmed,
	})
	@ApiProperty()
	status: TYPE.OrderStatus;

	@Column({nullable: false})
	@ApiProperty()
	checkInDate: Date;

	@Column({nullable: false})
	@ApiProperty()
	checkOutDate: Date;

	@Column({nullable: false, default: 0})
	@ApiProperty()
	numDays: number;

	@Column({nullable: false, default: 0})
	@ApiProperty()
	numNights: number;

	@Column({nullable: false, default: 0})
	@ApiProperty()
	numHours: number;

	@Column({nullable: false, default: 0})
	@ApiProperty()
	numMoreHours: number;

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

	@OneToMany(
		() => CustomerOrder,
		(customerOrder) => customerOrder[ORDER_RELATION]
	)
	[CUSTOMER_ORDER_RELATION]: CustomerOrder[];

	// @OneToMany(() => Payment, (payment) => payment[ORDER_RELATION])
	// [PAYMENT_RELATION]: Payment[];

	@OneToMany(() => RoomOrder, (roomOrder) => roomOrder[ORDER_RELATION])
	[ROOM_ORDER_RELATION]: RoomOrder[];

	@OneToMany(() => ServiceOrder, (roomOrder) => roomOrder[ORDER_RELATION])
	[SERVICE_ORDER_RELATION]: ServiceOrder[];

	@OneToMany(() => OtherOrder, (OtherOrder) => OtherOrder[ORDER_RELATION])
	[OTHER_ORDER_RELATION]: OtherOrder[];

	@ManyToOne(() => Account, (Account) => Account[ORDER_RELATION])
	[ACCOUNT_RELATION]: Account;

	// @OneToOne(() => Revenue, {cascade: true})
	// [REVENUE_RELATION]: Revenue;
}

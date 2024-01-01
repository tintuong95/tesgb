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
	JoinColumn,
} from 'typeorm';

import {ApiProperty} from '@nestjs/swagger';
import {Service} from './Service';
import {
	ACCOUNT_RELATION,
	ORDER_RELATION,
	SERVICE_ORDER_RELATION,
	SERVICE_RELATION,
	SERVICE_TYPE_RELATION,
} from '@contants/relation';
import {Order} from './Order';
import {Account} from './Account';

@Entity({name: 'ServiceOrder'})
export class ServiceOrder extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({nullable: false})
	@ApiProperty()
	orderId: string;

	@Column({nullable: false})
	@ApiProperty()
	serviceId: string;

	@Column({nullable: false, default: 1})
	@ApiProperty()
	quanlity: number;

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

	@ManyToOne(() => Service, (Service) => Service[SERVICE_TYPE_RELATION])
	[SERVICE_RELATION]: Service;

	@ManyToOne(() => Order, (Order) => Order[SERVICE_ORDER_RELATION])
	[ORDER_RELATION]: Order;

	@ManyToOne(() => Account, (Account) => Account[SERVICE_ORDER_RELATION])
	[ACCOUNT_RELATION]: Account;
}

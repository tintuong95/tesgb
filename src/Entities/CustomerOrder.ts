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
import {
	ACCOUNT_RELATION,
	CUSTOMER_ORDER_RELATION,
	CUSTOMER_RELATION,
	ORDER_RELATION,
} from '@contants/relation';
import {Order} from './Order';
import {Customer} from './Customer';
import {Account} from './Account';

@Entity({name: 'CustomerOrders'})
export class CustomerOrder extends BaseEntity {
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
	customerId: string;

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

	@ManyToOne(() => Order, (Order) => Order[CUSTOMER_ORDER_RELATION])
	[ORDER_RELATION]: Order;

	@ManyToOne(() => Customer, (Customer) => Customer[CUSTOMER_ORDER_RELATION])
	[CUSTOMER_RELATION]: Customer;

	@ManyToOne(() => Account, (Account) => Account[CUSTOMER_ORDER_RELATION])
	[ACCOUNT_RELATION]: Account;
}

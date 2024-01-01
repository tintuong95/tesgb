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
	PrimaryGeneratedColumn,
} from 'typeorm';

import {ApiProperty} from '@nestjs/swagger';
import {Order} from './Order';
import {
	ACCOUNT_RELATION,
	ORDER_RELATION,
	PAYMENT_RELATION,
} from '@contants/relation';
import {Account} from './Account';
import * as TYPE from './Types/core';
@Entity({name: 'Payments'})
export class Payment extends BaseEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	id: number;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({
		type: 'enum',
		enum: TYPE.PAYMENT_OPTION,
		default: TYPE.PAYMENT_OPTION.OPTION_1,
	})
	@ApiProperty()
	option: TYPE.PAYMENT_OPTION;

	@Column({
		type: 'enum',
		enum: TYPE.ACCOUNT_TYPE,
		default: TYPE.ACCOUNT_TYPE.Basic,
	})
	@ApiProperty()
	type: TYPE.ACCOUNT_TYPE;

	@Column({nullable: false})
	@ApiProperty()
	amount: number;

	@Column({nullable: true})
	@ApiProperty()
	description: string;

	@Column({nullable: true})
	@ApiProperty()
	expiredAt: Date;

	@Column({length: 200, nullable: true})
	@ApiProperty()
	signature: string;

	@Column({
		type: 'enum',
		enum: TYPE.PAYMENT_STATUS,
		default: TYPE.PAYMENT_STATUS.Pending,
	})
	@ApiProperty()
	status: TYPE.PAYMENT_STATUS;

	@CreateDateColumn()
	@ApiProperty()
	createdAt: Date;

	@UpdateDateColumn()
	@ApiProperty()
	updatedAt: Date;

	@DeleteDateColumn()
	@ApiProperty()
	deletedAt: Date;

	// @BeforeInsert()
	// generateId() {
	// 	this.id = Math.random().toString(36).slice(2, 36);
	// }

	// @ManyToOne(() => BlogGroup, {cascade: true})
	// @JoinColumn({name: 'groupId', referencedColumnName: 'id'})
	// [BLOG_GROUP_RELATION]: BlogGroup;

	// @OneToMany(
	// 	() => BlogTagRelation,
	// 	(blogTagRelation) => blogTagRelation[BLOG_RELATION]
	// )
	// [BLOG_TAG_RE_RELATION]: BlogTagRelation[];

	// @ManyToOne(() => Order, (Order) => Order[PAYMENT_RELATION])
	// [ORDER_RELATION]: Order;

	@ManyToOne(() => Account, (Account) => Account[PAYMENT_RELATION])
	[ACCOUNT_RELATION]: Account;
}

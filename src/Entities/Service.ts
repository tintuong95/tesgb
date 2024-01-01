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
	OneToMany,
	OneToOne,
} from 'typeorm';

import {ApiProperty} from '@nestjs/swagger';
import * as TYPE from './Types/core';
import {ServiceType} from './ServiceType';
import {
	ACCOUNT_RELATION,
	SERVICE_ORDER_RELATION,
	SERVICE_RELATION,
	SERVICE_TYPE_RELATION,
	UNIT_RELATION,
} from '@contants/relation';
import {ServiceOrder} from './ServiceOrder';
import {Account} from './Account';
import {Unit} from './Unit';

@Entity({name: 'Services'})
export class Service extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({length: 50, nullable: false})
	@ApiProperty()
	name: string;

	@Column({nullable: false})
	@ApiProperty()
	serviceTypeId: string;

	@Column({nullable: false})
	@ApiProperty()
	unitId: string;

	@Column({nullable: false})
	@ApiProperty()
	price: number;

	@Column({nullable: false, default: 0})
	@ApiProperty()
	inventory: number;

	@Column({
		type: 'enum',
		enum: TYPE.ServiceStatus,
		default: TYPE.ServiceStatus.Ready,
	})
	@ApiProperty()
	status: TYPE.ServiceStatus;

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

	@ManyToOne(() => ServiceType, (serviceType) => serviceType[SERVICE_RELATION])
	[SERVICE_TYPE_RELATION]: ServiceType;

	@OneToMany(
		() => ServiceOrder,
		(serviceOrder) => serviceOrder[SERVICE_RELATION]
	)
	[SERVICE_ORDER_RELATION]: ServiceOrder[];

	@ManyToOne(() => Account, (Account) => Account[SERVICE_RELATION])
	[ACCOUNT_RELATION]: Account;

	@ManyToOne(() => Unit, (Unit) => Unit[SERVICE_RELATION]) // specify inverse side as a second parameter
	[UNIT_RELATION]: Unit;
}

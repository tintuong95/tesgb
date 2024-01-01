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
import {ACCOUNT_RELATION, STAFF_RELATION} from '@contants/relation';

@Entity({name: 'Staffs'})
export class Staff extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({length: 50, nullable: false})
	@ApiProperty()
	firstName: string;

	@Column({length: 50, nullable: false})
	@ApiProperty()
	lastName: string;

	@Column({length: 20, nullable: false})
	@ApiProperty()
	position: string;

	@Column({length: 200, nullable: false})
	@ApiProperty()
	address: string;

	@Column({length: 50, nullable: false})
	@ApiProperty()
	phone: string;

	@Column({length: 50, nullable: false})
	@ApiProperty()
	email: string;

	@Column({nullable: false})
	@ApiProperty()
	salary: number;

	@Column({length: 200, nullable: false})
	@ApiProperty()
	workSchedule: string;

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

	@ManyToOne(() => Account, (Account) => Account[STAFF_RELATION])
	[ACCOUNT_RELATION]: Account;
}

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
} from 'typeorm';

import {ApiProperty} from '@nestjs/swagger';
import {Service} from './Service';
import {
	ACCOUNT_RELATION,
	SERVICE_RELATION,
	SERVICE_TYPE_RELATION,
} from '@contants/relation';
import {Account} from './Account';

@Entity({name: 'ServiceTypes'})
export class ServiceType extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({length: 50, nullable: false})
	@ApiProperty()
	name: string;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({length: 200, nullable: true})
	@ApiProperty()
	note: string;

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

	@OneToMany(() => Service, (service) => service[SERVICE_TYPE_RELATION])
	[SERVICE_RELATION]: Service[];

	@ManyToOne(() => Account, (Account) => Account[SERVICE_TYPE_RELATION])
	[ACCOUNT_RELATION]: Account;
}

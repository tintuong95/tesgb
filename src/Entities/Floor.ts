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
import {Room} from './Room';
import {
	ACCOUNT_RELATION,
	FLOOR_RELATION,
	ROOM_RELATION,
} from '@contants/relation';
import {Account} from './Account';

@Entity({name: 'Floors'})
export class Floor extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({length: 50, nullable: false})
	@ApiProperty()
	name: string;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({length: 200, default: 'not found'})
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

	@OneToMany(() => Room, (room) => room[FLOOR_RELATION])
	[ROOM_RELATION]: Room[];

	@ManyToOne(() => Account, (Account) => Account[FLOOR_RELATION])
	[ACCOUNT_RELATION]: Account;
}

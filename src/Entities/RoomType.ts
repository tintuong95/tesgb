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
	JoinColumn,
} from 'typeorm';

import {ApiProperty} from '@nestjs/swagger';
import {Room} from './Room';
import {
	ACCOUNT_RELATION,
	PRICE_RELATION,
	ROOM_RELATION,
	ROOM_TYPE_RELATION,
} from '@contants/relation';
import {Price} from './Price';
import {Account} from './Account';
import * as TYPE from './Types/core';

@Entity({name: 'RoomTypes'})
export class RoomType extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({nullable: false})
	@ApiProperty()
	priceId: string;

	@Column({length: 50, nullable: false})
	@ApiProperty()
	name: string;

	@Column({nullable: false})
	@ApiProperty()
	quality: number;

	@Column({nullable: false})
	@ApiProperty()
	bed: number;

	@Column({length: 200, nullable: true})
	@ApiProperty()
	note: string;

	@Column({
		type: 'enum',
		enum: TYPE.BedType,
		default: TYPE.BedType.One,
	})
	@ApiProperty()
	bedType: TYPE.BedType;

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

	// @ManyToOne(() => BlogGroup, {cascade: true})
	// @JoinColumn({name: 'groupId', referencedColumnName: 'id'})
	// [BLOG_GROUP_RELATION]: BlogGroup;

	@OneToMany(() => Room, (room) => room[ROOM_TYPE_RELATION])
	[ROOM_RELATION]: Room[];

	@ManyToOne(() => Price, (room) => room[ROOM_TYPE_RELATION])
	[PRICE_RELATION]: Price;

	@ManyToOne(() => Account, (Account) => Account[ROOM_TYPE_RELATION])
	[ACCOUNT_RELATION]: Account;
}

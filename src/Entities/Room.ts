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
} from 'typeorm';

import {ApiProperty} from '@nestjs/swagger';
import {RoomType} from './RoomType';
import {
	ACCOUNT_RELATION,
	FLOOR_RELATION,
	ROOM_ORDER_RELATION,
	ROOM_RELATION,
	ROOM_TYPE_RELATION,
} from '@contants/relation';
import {Floor} from './Floor';
import * as TYPE from './Types/core';
import {Account} from './Account';
import {RoomOrder} from './RoomOrder';

@Entity({name: 'Rooms'})
export class Room extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({length: 20, nullable: false})
	@ApiProperty()
	name: string;

	@Column({nullable: false})
	@ApiProperty()
	floorId: string;

	@Column({nullable: false})
	@ApiProperty()
	roomTypeId: string;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({length: 200, nullable: true})
	@ApiProperty()
	note: string;

	@Column({
		type: 'enum',
		enum: TYPE.RoomStatus,
		default: TYPE.RoomStatus.Ready,
	})
	@ApiProperty()
	status: TYPE.RoomStatus;

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

	@ManyToOne(() => RoomType, (RoomType) => RoomType[ROOM_RELATION])
	[ROOM_TYPE_RELATION]: RoomType;

	// @OneToMany(
	// 	() => BlogTagRelation,
	// 	(blogTagRelation) => blogTagRelation[BLOG_RELATION]
	// )
	// [BLOG_TAG_RE_RELATION]: BlogTagRelation[];

	@ManyToOne(() => Floor, (Floor) => Floor[ROOM_RELATION])
	[FLOOR_RELATION]: Floor;

	@ManyToOne(() => Account, (Account) => Account[ROOM_RELATION])
	[ACCOUNT_RELATION]: Account;

	@OneToMany(() => RoomOrder, (RoomOrder) => RoomOrder[ROOM_RELATION])
	[ROOM_ORDER_RELATION]: RoomOrder[];
}

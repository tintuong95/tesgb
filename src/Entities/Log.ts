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
import {ACCOUNT_RELATION, LOG_RELATION} from '@contants/relation';

@Entity({name: 'Logs'})
export class Log extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({nullable: false})
	@ApiProperty()
	logType: number;

	@Column({length: 200, nullable: false})
	@ApiProperty()
	content: string;

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

	// @OneToMany(
	// 	() => BlogTagRelation,
	// 	(blogTagRelation) => blogTagRelation[BLOG_RELATION]
	// )
	// [BLOG_TAG_RE_RELATION]: BlogTagRelation[];

	// @ManyToOne(() => Account, {cascade: true})
	// @JoinColumn({name: 'creatorId', referencedColumnName: 'id'})
	// [ACCOUNT_RELATION]: Account;

	@ManyToOne(() => Account, (Account) => Account[LOG_RELATION])
	[ACCOUNT_RELATION]: Account;
}

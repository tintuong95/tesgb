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
import {ACCOUNT_RELATION, FEED_BACK_RELATION} from '@contants/relation';

@Entity({name: 'Feedbacks'})
export class Feedback extends BaseEntity {
	@PrimaryColumn()
	@ApiProperty()
	id: string;

	@Column({nullable: false})
	@ApiProperty()
	accountId: string;

	@Column({nullable: false})
	@ApiProperty()
	customerId: string;

	@Column({nullable: false})
	@ApiProperty()
	rating: number;

	@Column({nullable: false, length: 100})
	@ApiProperty()
	comment: string;

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

	@ManyToOne(() => Account, (Account) => Account[FEED_BACK_RELATION])
	[ACCOUNT_RELATION]: Account;
}

import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	ValidationPipe,
	HttpStatus,
	HttpCode,
	Put,
	Delete,
	Req,
	UseGuards,
} from '@nestjs/common';
import {MemberService} from '../services/core';

import {Member} from '../entities/core';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {CreateMemberDto} from 'Entities/Dto/Member';
import {IMemberController} from './Interfaces/IMemberController';
import {UserDto} from 'Shared/user.dto';
import {User} from 'Shared/user.decorator';
import {Request} from 'express';
import {JwtAuthGuard} from 'Services/JwtGuardService';

@Controller('member')
@ApiTags('member')
@UseGuards(JwtAuthGuard)
export class MemberController implements IMemberController {
	constructor(private memberService: MemberService) {}
	@Get('list')
	async getAllMembers(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<Member[]> {
		return await this.memberService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getMemberDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<Member> {
		return await this.memberService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createMember(
		@Body() createMemberDto: CreateMemberDto,
		@User() user: UserDto
	): Promise<Member> {
		return await this.memberService.createAsync(
			createMemberDto,
			user.accountId
		);
	}

	@Put(':id/update')
	async updateMember(
		@Body(ValidationPipe)
		updateMemberDto: CreateMemberDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<Member> {
		return await this.memberService.updateAsync(id, updateMemberDto);
	}

	@Delete(':id/remove')
	async removeMember(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.memberService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restoreMember(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.memberService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	async deleteMember(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.memberService.deleteAsync(id, user);
	}
}

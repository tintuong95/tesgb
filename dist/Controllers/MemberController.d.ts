import { MemberService } from '../services/core';
import { Member } from '../entities/core';
import { CreateMemberDto } from 'Entities/Dto/Member';
import { IMemberController } from './Interfaces/IMemberController';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class MemberController implements IMemberController {
    private memberService;
    constructor(memberService: MemberService);
    getAllMembers(request: Request, user: UserDto): Promise<Member[]>;
    getMemberDetails(id: string, user: UserDto): Promise<Member>;
    createMember(createMemberDto: CreateMemberDto, user: UserDto): Promise<Member>;
    updateMember(updateMemberDto: CreateMemberDto, user: UserDto, id: string): Promise<Member>;
    removeMember(id: string, user: UserDto): Promise<string>;
    restoreMember(id: string, user: UserDto): Promise<string>;
    deleteMember(id: string, user: UserDto): Promise<string>;
}

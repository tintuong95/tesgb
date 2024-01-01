import { Member } from '@entities/Member';
import { CreateMemberDto, UpdateMemberDto } from 'Entities/Dto/Member';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IMemberController {
    getAllMembers(request: Request, user: UserDto): Promise<Member[]>;
    getMemberDetails(id: string, user: UserDto): Promise<Member>;
    createMember(createAccountDto: CreateMemberDto, user: UserDto): Promise<Member>;
    updateMember(updateMemberDto: UpdateMemberDto, user: UserDto, id: string): Promise<Member>;
    removeMember(id: string, user: UserDto): Promise<string>;
    restoreMember(id: string, user: UserDto): Promise<string>;
    deleteMember(id: string, user: UserDto): Promise<string>;
}

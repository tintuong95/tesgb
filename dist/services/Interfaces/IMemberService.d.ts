import { Member } from '@entities/Member';
import { CreateMemberDto, UpdateMemberDto } from 'Entities/Dto/Member';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IMemberService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Member>;
    createAsync(createMemberDto: CreateMemberDto, accountId: string): Promise<Member>;
    updateAsync(id: string, updateMemberDto: UpdateMemberDto): Promise<Member>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}

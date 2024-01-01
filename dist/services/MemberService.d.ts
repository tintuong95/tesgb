import { Member } from '../entities/core';
import { Repository } from 'typeorm';
import { CreateMemberDto, SigninMemberDto, UpdateMemberDto } from 'Entities/Dto/core';
import { UserDto } from 'Shared/user.dto';
import { IMemberService } from './Interfaces/IMemberService';
import { Request } from 'express';
export declare class MemberService implements IMemberService {
    private memberRepository;
    private readonly logger;
    constructor(memberRepository: Repository<Member>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Member | any>;
    createAsync(createMemberDto: CreateMemberDto, accountId: string): Promise<Member>;
    updateAsync(id: string, updateMemberDto: UpdateMemberDto): Promise<Member>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
    signupAsync(signupDto: SigninMemberDto): Promise<Member>;
    signinAsync(signinDto: SigninMemberDto): Promise<Member>;
}

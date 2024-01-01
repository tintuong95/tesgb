import { JwtService } from '@nestjs/jwt';
import { AccountService } from '@services/AccountService';
import { MailService } from '../Services/MailService';
import { MemberService } from '@services/MemberService';
import { CreateAccountDto } from 'Entities/Dto/Account';
import { CreateMemberDto, SigninMemberDto } from 'Entities/Dto/Member';
import { UserDto } from 'Shared/user.dto';
export declare class AuthController {
    readonly memberService: MemberService;
    readonly accountService: AccountService;
    private jwtService;
    private mailService;
    constructor(memberService: MemberService, accountService: AccountService, jwtService: JwtService, mailService: MailService);
    login(signInDto: SigninMemberDto): Promise<any>;
    signup(signUpDto: {
        account: CreateAccountDto;
        member: CreateMemberDto;
    }): Promise<string>;
    getProfile(user: UserDto): Promise<UserDto>;
    createVerify(): Promise<string>;
    accountVerify(encryptedData: string): Promise<void>;
}

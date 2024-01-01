import {JwtService} from '@nestjs/jwt';
import {Injectable} from '@nestjs/common';

import {MemberService} from './MemberService';
import {CreateMemberDto} from 'Entities/Dto/Member';
import {ProductService} from './ProductService';

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}
}

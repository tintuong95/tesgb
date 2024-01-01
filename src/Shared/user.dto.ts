export class UserDto {
	id: string;
	accountId: string;
	username: string;
	// role: ROLE_STATUS;
	iat: number;
	exp: number;
	expiredAt: Date;
}

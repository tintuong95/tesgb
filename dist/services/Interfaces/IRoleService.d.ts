import { Role } from '@entities/Role';
import { CreateRoleDto, UpdateRoleDto } from 'Entities/Dto/Role';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IRoleService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Role | any>;
    createAsync(createRoleDto: CreateRoleDto, user: UserDto): Promise<Role>;
    updateAsync(id: string, updateRoleDto: UpdateRoleDto, user: UserDto): Promise<Role>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}

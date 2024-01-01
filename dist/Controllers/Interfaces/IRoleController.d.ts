import { Role } from '@entities/Role';
import { CreateRoleDto, UpdateRoleDto } from 'Entities/Dto/Role';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IRoleController {
    getAllRoles(request: Request, user: UserDto): Promise<Role[]>;
    getRoleDetails(id: string, user: UserDto): Promise<Role>;
    createRole(createRoleDto: CreateRoleDto, user: UserDto): Promise<Role>;
    updateRole(updateRoleDto: UpdateRoleDto, user: UserDto, id: string): Promise<Role>;
    removeRole(id: string, user: UserDto): Promise<string>;
    restoreRole(id: string, user: UserDto): Promise<string>;
    deleteRole(id: string, user: UserDto): Promise<string>;
}

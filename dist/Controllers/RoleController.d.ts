import { RoleService } from '../services/core';
import { Role } from '../Entities/core';
import { CreateRoleDto, UpdateRoleDto } from '@entities/DTO/core';
import { IRoleController } from './Interfaces/IRoleController';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class RoleController implements IRoleController {
    private accessService;
    constructor(accessService: RoleService);
    getAllRoles(request: Request, user: UserDto): Promise<Role[]>;
    getRoleDetails(id: string, user: UserDto): Promise<Role>;
    createRole(createRoleDto: CreateRoleDto, user: UserDto): Promise<Role>;
    updateRole(updateRoleDto: UpdateRoleDto, user: UserDto, id: string): Promise<Role>;
    removeRole(id: string, user: UserDto): Promise<string>;
    restoreRole(id: string, user: UserDto): Promise<string>;
    deleteRole(id: string, user: UserDto): Promise<string>;
}

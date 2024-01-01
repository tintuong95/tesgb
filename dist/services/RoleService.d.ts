import { Role } from '../entities/core';
import { Repository } from 'typeorm';
import * as DTO from '../Entities/Dto/core';
import { IRoleService } from './Interfaces/IRoleService';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class RoleService implements IRoleService {
    private roleRepository;
    constructor(roleRepository: Repository<Role>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Role | any>;
    createAsync(createRoleDto: DTO.CreateRoleDto, user: UserDto): Promise<Role>;
    updateAsync(id: string, updateRoleDto: DTO.UpdateRoleDto, user: UserDto): Promise<Role>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}

import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	ValidationPipe,
	HttpStatus,
	HttpCode,
	Put,
	Delete,
	Req,
	UseGuards,
} from '@nestjs/common';
import {EmployeesService} from '../services/core';
import {CreateEmployeeDto, UpdateEmployeeDto} from '../Entities/Dto/core';
import {Employee} from '../entities/core';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {Request} from 'express';
import {IEmployeesController} from './Interfaces/IEmployeesController';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import {JwtAuthGuard} from 'Services/JwtGuardService';

@Controller('employee')
@ApiTags('employee')
@UseGuards(JwtAuthGuard)
export class EmployeeController implements IEmployeesController {
	constructor(private employeeService: EmployeesService) {}
	@Get('list')
	async getAllEmployees(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<Employee[]> {
		return await this.employeeService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getEmployeeDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<Employee> {
		return await this.employeeService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createEmployee(
		@Body() createEmployeeDto: CreateEmployeeDto,
		@User() user: UserDto
	): Promise<Employee> {
		return await this.employeeService.createAsync(createEmployeeDto, user);
	}

	@Put(':id/update')
	async updateEmployee(
		@Body(ValidationPipe)
		updateEmployeeDto: UpdateEmployeeDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<Employee> {
		return await this.employeeService.updateAsync(id, updateEmployeeDto, user);
	}

	@Delete(':id/remove')
	async removeEmployee(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.employeeService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restoreEmployee(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.employeeService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	async deleteEmployee(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.employeeService.deleteAsync(id, user);
	}

	@Get('/count-employee-by-status')
	async countEmployeeByStatus(
		@User() user: UserDto,
		@Req() request: Request
	): Promise<string> {
		return await this.employeeService.countEmployeeStatusCurrent(user, request);
	}
}

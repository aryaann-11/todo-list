import { Controller, Get, Post, Body, Param, BadRequestException } from '@nestjs/common';
import { CreateEmployeeRequest } from './dto/create.employee';
import { Employee } from './schema/employee.schema';
import { EmployeeService } from './service/employee.service';

enum ERROR_CODES {
  NOT_FOUND = 1
}


@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(@Body() createEmployeeReq: CreateEmployeeRequest) : Promise<Employee> {
    return await this.employeeService.createEmployee(createEmployeeReq);
  }

  @Get('/:id')
  async readOne(@Param('id') id: string) : Promise<Employee | BadRequestException>{
    const readResult = await this.employeeService.readEmployee(id);
    if(!readResult){
      return new BadRequestException(ERROR_CODES.NOT_FOUND)
    } 
    return readResult;
  }
}

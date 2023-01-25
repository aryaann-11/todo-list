import { Controller, Get, Post, Body, Param, BadRequestException } from '@nestjs/common';
import { CreateEmployeeRequest } from './dto/create.employee';
import { Employee } from './schema/employee.schema';
import { IEmployeeService } from './abstract/abstract.employee.service';
import { RemoveEmployeeRequest } from './dto/remove.employee';
import { UpdateEmployeeRequest } from './dto/update.employee';

enum ERROR_CODES {
  NOT_FOUND = 1
}


@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: IEmployeeService) {}

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

  @Post('/remove')
  async removeOne(@Body() removeEmployeeReq: RemoveEmployeeRequest) : Promise<Employee | BadRequestException>{
    const removeResult = await this.employeeService.removeEmployee(removeEmployeeReq._id);
    if(!removeResult){
      return new BadRequestException(ERROR_CODES.NOT_FOUND)
    }
    return removeResult;
  }

  @Post('/update')
  async updateOne(@Body() updateEmployeeReq: UpdateEmployeeRequest) : Promise<UpdateEmployeeRequest | BadRequestException>{
    const updateResult = await this.employeeService.updateEmployee(updateEmployeeReq);
    if(!updateResult){
      return new BadRequestException(ERROR_CODES.NOT_FOUND)
    }
    return updateEmployeeReq;
  }
}

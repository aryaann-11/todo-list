import { Injectable } from '@nestjs/common';
import { CreateEmployeeRequest } from '../dto/create.employee';
import { Employee } from '../schema/employee.schema';
import { EmployeeRepository } from './employee.repository';
import { ReadEmployeeRequest } from '../dto/read.employee';
import { Types } from 'mongoose';
import { ObjectId } from 'mongoose';
import { DeleteEmployeeRequest } from '../dto/delete.employee';

@Injectable()
export class EmployeeService {
    constructor(private readonly employeeRepository: EmployeeRepository) { }

    async createEmployee(createEmployeeReq: CreateEmployeeRequest): Promise<Employee> {
        const employee = createEmployeeReq as Employee;
        const savedEmployee = await this.employeeRepository.create(employee);
        return savedEmployee;
    }

    async readEmployee(_id : string): Promise<Employee | null> {
        return this.employeeRepository.findOne({ _id })
    }
}

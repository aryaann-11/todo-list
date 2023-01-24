import { Injectable } from '@nestjs/common';
import { CreateEmployeeRequest } from '../dto/create.employee';
import { Employee } from '../schema/employee.schema';
import { EmployeeRepository } from './employee.repository';
import { IEmployeeRepository } from './abstract.employee.repository';
import { ReadEmployeeRequest } from '../dto/read.employee';
import { Types } from 'mongoose';
import { ObjectId } from 'mongoose';
import { UpdateEmployeeRequest } from '../dto/update.employee';

@Injectable()
export class EmployeeService {
    constructor(private readonly employeeRepository: IEmployeeRepository) { }

    private extractEmployee(updateEmployeeReq : UpdateEmployeeRequest){
        return {
            firstName: updateEmployeeReq.firstName,
            lastName: updateEmployeeReq.lastName,
            designation: updateEmployeeReq.designation,
        }
    }

    async createEmployee(createEmployeeReq: CreateEmployeeRequest): Promise<Employee> {
        const employee = createEmployeeReq as Employee;
        console.log(this.employeeRepository);
        const savedEmployee = await this.employeeRepository.create(employee);
        return savedEmployee;
    }

    async readEmployee(_id : string): Promise<Employee | null> {
        return this.employeeRepository.findOne({ _id })
    }

    async removeEmployee(_id : string): Promise<Employee | null> {
        try{
            const employee = await this.employeeRepository.remove({ _id })
            return employee;
        }
        catch(err) {
            return null;
        }
    }

    async updateEmployee(updateEmployeeReq : UpdateEmployeeRequest) : Promise<Employee | null> {
        const newEmpDoc = this.extractEmployee(updateEmployeeReq);
        try{
            const employee = await this.employeeRepository.update({ _id: updateEmployeeReq._id}, newEmpDoc);
            return employee;
        }
        catch(err) {
            return null;
        }
    }
}

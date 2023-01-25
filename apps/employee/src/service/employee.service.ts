import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeRequest } from '../dto/create.employee';
import { Employee } from '../schema/employee.schema';
import { IEmployeeRepository } from '../abstract/abstract.employee.repository';
import { UpdateEmployeeRequest } from '../dto/update.employee';
import { IEmployeeService } from '../abstract/abstract.employee.service';

@Injectable()
export class EmployeeService implements IEmployeeService{
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
        try{
            const result = await this.employeeRepository.findOne({ _id })
            return result;
        }
        catch(e){
            console.log(e);
            return null;
        }
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

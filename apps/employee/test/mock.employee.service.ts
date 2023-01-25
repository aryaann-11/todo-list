import { Types } from "mongoose";
import { CreateEmployeeRequest } from "../src/dto/create.employee";
import { UpdateEmployeeRequest } from "../src/dto/update.employee";
import { Employee } from "../src/schema/employee.schema";
import { IEmployeeService } from "../src/service/abstract.employee.service";


export class MockEmployeeService implements IEmployeeService {
    public async createEmployee(doc: CreateEmployeeRequest): Promise<Employee> {
        const _id = new Types.ObjectId(1);
        return {_id,...doc}
    }
    public async readEmployee(id: string): Promise<Employee | null> {
        if(id != '1'){
            return null;
        }
        const emp : Employee = {
            _id: new Types.ObjectId(1),
            firstName : 'First Name',
            lastName : 'Last Name',
            designation : 'Designation'
        }
        return emp;
    }
    public async removeEmployee(id: string): Promise<Employee | null> {
        if(id != '1'){
            return null;
        }
        const emp : Employee = {
            _id: new Types.ObjectId(1),
            firstName : 'First Name',
            lastName : 'Last Name',
            designation : 'Designation'
        }
        return emp;
    }
    public async updateEmployee(updateEmployeeReq : UpdateEmployeeRequest) : Promise<Employee | null>{
        const _id : string= updateEmployeeReq._id;
        if(_id != '1'){
            return null;
        }
        const emp : Employee = {
            _id : new Types.ObjectId(parseInt(updateEmployeeReq._id)),
            firstName : updateEmployeeReq.firstName,
            lastName : updateEmployeeReq.lastName,
            designation : updateEmployeeReq.designation
        }
        return emp;
    }
}
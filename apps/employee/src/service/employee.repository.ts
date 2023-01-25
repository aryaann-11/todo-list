import { AbstractRepository } from "@app/common/database/abstract.repository";
import { Model, Connection } from 'mongoose';
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Employee } from "../schema/employee.schema";
import { IEmployeeRepository } from "../abstract/abstract.employee.repository";

@Injectable()
export class EmployeeRepository extends AbstractRepository<Employee> implements IEmployeeRepository{
    constructor(
        @InjectModel(Employee.name) employeeModel : Model<Employee>,
        @InjectConnection() connection : Connection
    ){
        super(employeeModel, connection);
    }
}
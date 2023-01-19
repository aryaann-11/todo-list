import { AbstractRepository } from "@app/common/database/abstract.repository";
import { Model, Connection } from 'mongoose';
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Employee } from "../schema/employee.schema";

@Injectable()
export class EmployeeRepository extends AbstractRepository<Employee>{
    constructor(
        @InjectModel(Employee.name) todoModel : Model<Employee>,
        @InjectConnection() connection : Connection
    ){
        super(todoModel, connection);
    }
}
import { NotFoundException, NotImplementedException } from "@nestjs/common";
import { FilterQuery, Types } from "mongoose";
import { Employee } from "../src/schema/employee.schema";
import { IEmployeeRepository } from "../src/abstract/abstract.employee.repository";

export class MockEmployeeRepository implements IEmployeeRepository{
    private employees : Employee[];
    constructor(){
        this.employees = [
            {
                _id : new Types.ObjectId(),
                firstName : "first 0",
                lastName : "last 0",
                designation : "designation 0",
            },
            {
                _id : new Types.ObjectId(),
                firstName : "first 1",
                lastName : "last 1",
                designation : "designation 1",
            },
            {
                _id : new Types.ObjectId(),
                firstName : "first 2",
                lastName : "last 2",
                designation : "designation 2",
            },
        ]
    }
    async create(document: Omit<Employee, '_id'>): Promise<Employee>{
        const _id = new Types.ObjectId();
        const newEmp = {...document,_id}
        this.employees.push(newEmp);
        return newEmp;
    }
    async findOne(filterQuery : FilterQuery<Employee>) : Promise<Employee>{
        const { _id } = filterQuery;
        const employee =  this.employees.find(e => e._id.equals(_id));
        if(!employee){
            throw new NotFoundException('Document not found');
        }
        return employee;
    }
    async remove(filterQuery : FilterQuery<Employee>) : Promise<Employee>{
        const { _id } = filterQuery;
        const employee =  this.employees.find(e => e._id.equals(_id));
        if(!employee){
            throw new NotFoundException('Document not found');
        }
        const index = this.employees.indexOf(employee,0);
        this.employees.splice(index, 1);
        return employee;
    }
    async update(filterQuery : FilterQuery<Employee>, document: Omit<Employee, '_id'>) : Promise<Employee>{
        const { _id } = filterQuery;
        const employee =  this.employees.find(e => e._id.equals(_id));
        if(!employee){
            throw new NotFoundException('Document not found');
        }
        const index = this.employees.indexOf(employee,0);
        const newEmp : Employee = {
            _id : _id,
            firstName : document.firstName,
            lastName : document.lastName,
            designation : document.designation,
        }
        this.employees[index] = newEmp
        return newEmp;
    }
    async find(filterQuery : FilterQuery<Employee>) : Promise<Employee[]> {
        throw new NotImplementedException();
    }
}
import { FilterQuery, UpdateQuery } from "mongoose";
import { Employee } from "../schema/employee.schema";

export abstract class IEmployeeRepository{
    abstract create(document: Omit<Employee, '_id'>): Promise<Employee> 
    
    abstract findOne(filterQuery: FilterQuery<Employee>): Promise<Employee> 
    
    abstract find(filterQuery: FilterQuery<Employee>): Promise<Employee[]> 
    
    abstract update(
        filterQuery: FilterQuery<Employee>,
        updateQuery: UpdateQuery<Employee>,
      ): Promise<Employee> 
    
    abstract remove(filterQuery: FilterQuery<Employee>): Promise<Employee>
}
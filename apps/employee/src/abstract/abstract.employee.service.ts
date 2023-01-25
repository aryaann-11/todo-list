import { CreateEmployeeRequest } from "../dto/create.employee";
import { UpdateEmployeeRequest } from "../dto/update.employee";
import { Employee } from "../schema/employee.schema";

export abstract class IEmployeeService {
    abstract createEmployee(doc : CreateEmployeeRequest): Promise<Employee>
    abstract readEmployee(id : string) : Promise<Employee | null>
    abstract removeEmployee(id : string) : Promise<Employee | null>
    abstract updateEmployee(doc : UpdateEmployeeRequest) : Promise<Employee | null>
}
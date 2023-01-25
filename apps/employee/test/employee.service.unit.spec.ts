import { Test, TestingModule } from "@nestjs/testing";
import { EmployeeService } from "../src/service/employee.service";
import { CreateEmployeeRequest } from "../src/dto/create.employee";
import {  Types } from "mongoose";
import { MockEmployeeRepository } from "./mock-employee.repository";
import { IEmployeeRepository } from "../src/service/abstract.employee.repository";

describe("EmployeeService", () => {
    let employeeService: EmployeeService;
    let employeeRepository: IEmployeeRepository;

    beforeEach(async () => {
        const module : TestingModule =  await Test.createTestingModule({
            providers : [EmployeeService, 
                {
                    provide : IEmployeeRepository,
                    useClass : MockEmployeeRepository
                }
                    ]
        }).compile();

        employeeService = module.get<EmployeeService>(EmployeeService);
        employeeRepository = module.get<IEmployeeRepository>(IEmployeeRepository);
        
    })

    it('should be defined',()=>{
        expect(employeeService).toBeDefined();
        expect(employeeRepository).toBeDefined();
    })

    describe('create',()=>{
        it('should create an employee', async () => {
            const createEmployeeRequest : CreateEmployeeRequest = {
                firstName : "John",
                lastName : "Doe",
                designation : "Intern"
            }
            const result = await employeeService.createEmployee(createEmployeeRequest);
            expect(result._id).toBeInstanceOf(Types.ObjectId);
            const returnedEmp : CreateEmployeeRequest = {
                firstName : result.firstName,
                lastName : result.lastName,
                designation : result.designation
            }
            expect(returnedEmp).toEqual(createEmployeeRequest);
        })
    })

    describe('read', () => {
        it('should return one employee', async () => {
            const employee : CreateEmployeeRequest = {
                firstName : "First name",
                lastName : "Last name",
                designation : "Designation"
            }
            const createResult = await employeeService.createEmployee(employee);
            const id : string = createResult._id.toString();
            const result = await employeeService.readEmployee(id);
            expect(result).toEqual(createResult);
        })
    })

    describe('remove', () => {
        it('should delete one employee', async () => {
            const employee : CreateEmployeeRequest = {
                firstName : "First name",
                lastName : "Last name",
                designation : "Designation"
            }
            const createResult = await employeeService.createEmployee(employee);
            const id : string = createResult._id.toString();
            const result = await employeeService.removeEmployee(id);
            expect(result).toEqual(createResult);
        })
    })

    describe('update' , () => {
        it('should update one employee', async () => {
            const employee : CreateEmployeeRequest = {
                firstName : "First name",
                lastName : "Last name",
                designation : "Designation"
            }
            const createResult = await employeeService.createEmployee(employee);
            const id  = createResult._id;
            const newEmp = {
                _id : id.toString(),
                firstName : "New first name",
                lastName : "New last name",
                designation : "New designation"
            }
            const updateResult = await employeeService.updateEmployee(newEmp);
            const expectedResult = {
                _id : id.toString(),
                firstName : newEmp.firstName,
                lastName : newEmp.lastName,
                designation : newEmp.designation
            }
            expect(expectedResult).toEqual(newEmp);
        })
    })

    describe('Find should return null if employee does not exist', ()=>{
        it('should return null if employee does not exist', async () => {
            const id = '1';
            const result = await employeeService.readEmployee(id);
            expect(result).toBeNull();
        })
    })

    describe('Remove should return null if employee does not exist', ()=>{
        it('should return null if employee does not exist', async () => {
            const id = '1';
            const result = await employeeService.removeEmployee(id);
            expect(result).toBeNull();
        })
    })

    describe('Update should return null if employee does not exist', ()=>{
        it('should return null if employee does not exist', async () => {
            const newEmp = {
                _id : "1",
                firstName : "New first name",
                lastName : "New last name",
                designation : "New designation"
            }
            const result = await employeeService.updateEmployee(newEmp);
            expect(result).toBeNull();
        })
    })
})
import { BadRequestException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TestingModule } from "@nestjs/testing";
import { Types } from "mongoose";
import { CreateEmployeeRequest } from "../src/dto/create.employee";
import { RemoveEmployeeRequest } from "../src/dto/remove.employee";
import { UpdateEmployeeRequest } from "../src/dto/update.employee";
import { EmployeeController } from "../src/employee.controller";
import { Employee } from "../src/schema/employee.schema";
import { IEmployeeService } from "../src/service/abstract.employee.service";
import { MockEmployeeService } from "./mock.employee.service";



enum ERROR_CODES {
    NOT_FOUND = 1
  }


describe('Employee Controller', () => {
    let employeeController: EmployeeController;
    let employeeService : IEmployeeService
    
    beforeEach(async () => {
        const module : TestingModule =  await Test.createTestingModule({
            controllers : [EmployeeController],
            providers : [{provide : IEmployeeService, useClass : MockEmployeeService}]
        }).compile();
        employeeController = module.get<EmployeeController>(EmployeeController);
        employeeService = module.get<IEmployeeService>(IEmployeeService);
    })

    it('should be defined',()=>{
        expect(employeeService).toBeDefined();
        expect(employeeController).toBeDefined();
    })

    describe('create',()=>{
        it('should create and return an employee', async ()=> {
            const doc : CreateEmployeeRequest = {
                firstName : 'John',
                lastName : 'Doe',
                designation : 'Software Engineer'
            }
            const result = await employeeController.create(doc);
            expect(result._id).toBeInstanceOf(Types.ObjectId);
            const returnedEmp : CreateEmployeeRequest = {
                firstName : result.firstName,
                lastName : result.lastName,
                designation : result.designation
            }
            expect(returnedEmp).toEqual(doc);
        })
    })

    describe('readOne', () => {
        it('should return an employee', async () => {
            const result = await employeeController.readOne('1') as Employee;
            const expectedResult = {
                firstName : 'First Name',
                lastName : 'Last Name',
                designation : 'Designation'
            }
            const returnedEmp = {
                firstName : result.firstName,
                lastName : result.lastName,
                designation : result.designation
            }
            expect(expectedResult).toEqual(returnedEmp);
        })
    })

    describe('readOne', () => {
        it('should return bad request excpetion if employee not found', async ()=>{
            const result = await employeeController.readOne('2') as BadRequestException;
            const expectedResult = new BadRequestException(ERROR_CODES.NOT_FOUND)
            expect(result).toEqual(expectedResult);
        })
    })

    describe('removeOne', () => {
        it('should remove employee and return the doc', async () => {
            const doc : RemoveEmployeeRequest = {
                _id : '1'
            }
            const result = await employeeController.removeOne(doc) as Employee;
            const expectedResult = {
                firstName : 'First Name',
                lastName : 'Last Name',
                designation : 'Designation'
            }
            const returnedEmp = {
                firstName : result.firstName,
                lastName : result.lastName,
                designation : result.designation
            } 
            expect(returnedEmp).toEqual(expectedResult);
        })
    })

    describe('removeOne', () => {
        it('shoudl return bad request exception if doc not found', async () => {
            const result = await employeeController.removeOne({_id : '2'}) as BadRequestException;
            const expectedResult = new BadRequestException(ERROR_CODES.NOT_FOUND)
            expect(result).toEqual(expectedResult);
        })
    })

    describe('updateOne', () => {
        it('should update employee', async () => {
            const req : UpdateEmployeeRequest = {
                _id : '1',
                firstName : 'First Name',
                lastName : 'Last Name',
                designation : 'Designation'
            }
            const result = await employeeController.updateOne(req) as UpdateEmployeeRequest;
            const returnedDoc = {
                _id : '1',
                firstName : result.firstName,
                lastName : result.lastName,
                designation : result.designation
            }
            expect(returnedDoc).toEqual(req);
        })
    })

    describe('updateOne',()=>{
        it('should return bad request exception if employee does not exist', async () =>{
            const req : UpdateEmployeeRequest = {
                _id : '2',
                firstName : 'First Name',
                lastName : 'Last Name',
                designation : 'Designation'
            }
            const result = await employeeController.updateOne(req) as BadRequestException;
            const expectedResult = new BadRequestException(ERROR_CODES.NOT_FOUND)
            expect(result).toEqual(expectedResult);
        })
    })
})
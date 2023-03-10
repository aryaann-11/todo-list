import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './service/employee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '@app/common/database/database.module';
import { Employee } from './schema/employee.schema';
import { EmployeeSchema } from './schema/employee.schema';
import * as Joi from 'joi';
import { EmployeeRepository } from './service/employee.repository';
import { IEmployeeRepository } from './abstract/abstract.employee.repository';
import { IEmployeeService } from './abstract/abstract.employee.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      MONGODB_URI: Joi.string().required(),
      PORT: Joi.number().required(),
    }),
    envFilePath: './apps/employee/.env',
  }),
  DatabaseModule,
  MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }]),],
  controllers: [EmployeeController],
  providers: [{provide : IEmployeeService, useClass: EmployeeService}, 
    {provide: IEmployeeRepository, useClass: EmployeeRepository}],
})
export class EmployeeModule {}

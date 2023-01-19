import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({versionKey:false})
export class Employee extends AbstractDocument{
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  designation: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
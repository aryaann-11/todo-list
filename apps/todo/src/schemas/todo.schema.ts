import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TodoStatus } from './status.type';

@Schema({versionKey:false})
export class Todo extends AbstractDocument{
  @Prop()
  title: string;

  @Prop()
  details: string;

  @Prop({ type: 'Number'})
  status: TodoStatus;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'Joi';
import { DatabaseModule } from '@app/common/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { TodoRepository } from './todo.repository';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      MONGODB_URI: Joi.string().required(),
      PORT: Joi.number().required(),
    }),
    envFilePath: './apps/todo/.env',
  }),
  DatabaseModule,
  MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),],
  controllers: [TodoController],
  providers: [TodoService, TodoRepository],
})
export class TodoModule {}

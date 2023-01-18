import { Injectable } from '@nestjs/common';
import { CreateTodoRequest } from './dto/create.todo';
import { TodoStatus } from './schemas/status.type';
import { TodoRepository } from './todo.repository';
import { Todo } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository : TodoRepository){}

  async createTodo(createTodoRequest : CreateTodoRequest) : Promise<Todo>{
    const initTodoStatus = TodoStatus.ACTIVE;
    const todo = {
      ...createTodoRequest,
      status: initTodoStatus,
    }
    const savedTodo = await this.todoRepository.create(todo);
    return savedTodo;
  }

  async findAllTodos() : Promise<Todo[]> {
    return this.todoRepository.find({});
  }
}

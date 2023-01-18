import { Body, Controller, Get , Post} from '@nestjs/common';
import { CreateTodoRequest } from './dto/create.todo';
import { Todo } from './schemas/todo.schema';
import { TodoService } from './todo.service';

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async createTodo(@Body() createTodoRequest : CreateTodoRequest): Promise<Todo> {
    return this.todoService.createTodo(createTodoRequest);
  }

  @Get()
  async getTodos(): Promise<Todo[]> {
    return this.todoService.findAllTodos();
  }

}

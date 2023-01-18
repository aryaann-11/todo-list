import { Todo } from "./schemas/todo.schema";
import { AbstractRepository } from "@app/common/database/abstract.repository";
import { Model, Connection } from 'mongoose';
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TodoRepository extends AbstractRepository<Todo>{
    constructor(
        @InjectModel(Todo.name) todoModel : Model<Todo>,
        @InjectConnection() connection : Connection
    ){
        super(todoModel, connection);
    }
}
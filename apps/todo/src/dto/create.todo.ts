import { IsNotEmpty, IsString } from "class-validator";


export class CreateTodoRequest{
    @IsString()
    @IsNotEmpty()
    title : string;

    @IsString()
    @IsNotEmpty()
    details : string;
}
import { IsNotEmpty, IsString } from "class-validator";

export class DeleteEmployeeRequest{
    @IsNotEmpty()
    @IsString()
    id: string;
}
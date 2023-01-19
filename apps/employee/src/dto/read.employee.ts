import { IsNotEmpty, IsString } from "class-validator";

export class ReadEmployeeRequest{
    @IsNotEmpty()
    @IsString()
    id: string;
}
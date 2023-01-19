import { IsNotEmpty, IsString } from "class-validator";


export class CreateEmployeeRequest{
    @IsString()
    @IsNotEmpty()
    firstName : string;

    @IsString()
    @IsNotEmpty()
    lastName : string;

    @IsString()
    @IsNotEmpty()
    designation : string;
}
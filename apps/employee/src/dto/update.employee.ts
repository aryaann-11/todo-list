import { IsNotEmpty, IsString } from "class-validator";

export class UpdateEmployeeRequest {
    @IsNotEmpty()
    @IsString()
    _id : string;

    @IsNotEmpty()
    @IsString()

    @IsNotEmpty()
    @IsString()
    firstName : string;

    @IsNotEmpty()
    @IsString()
    lastName : string;

    @IsNotEmpty()
    @IsString()
    designation : string;
}
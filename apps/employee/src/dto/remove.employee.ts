import { IsNotEmpty, IsString } from "class-validator";

export class RemoveEmployeeRequest{
    @IsNotEmpty()
    @IsString()
    _id: string;
}
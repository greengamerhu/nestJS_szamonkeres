import { IsNotEmpty, IsString, IsNumber } from "class-validator"

export class CreateAccountDto {
    id :number
    @IsNotEmpty()
    @IsString()
    accountNumber: string
    @IsNotEmpty()
    @IsNumber()
    balance: number 
}

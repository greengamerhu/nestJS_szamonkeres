import { Contains, IsBoolean, IsNotEmpty, IsString } from "class-validator"

export class CreateOwnerDto {
    id : number
    @IsNotEmpty()
    @IsString()
    @Contains(" ")
    fullName: string
    @IsNotEmpty()
    @IsBoolean()
    business: boolean
}

import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({example: "who@gmail.com", description: "Email"})
    readonly email: string;
    @ApiProperty({example: "who12345", description: "Password"})
    readonly password: string;
}
import { ApiProperty } from "@nestjs/swagger";
import { AuthDto } from "./authDto";

export class SignUpDto extends AuthDto {
    @ApiProperty({ required: true, description: 'email for your account' })
    email: string;
}
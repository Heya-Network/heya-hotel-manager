import { IsEmail } from 'class-validator';
export class CreateUserDto {
    @IsEmail() email: string;
    password: string;
    polkadotSs58?: string;
    metamaskHex?: string;
}

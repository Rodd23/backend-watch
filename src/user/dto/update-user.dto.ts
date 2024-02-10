import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { UpdateUser } from '../entities/update-user.entity';

export class UpdateUserDto extends UpdateUser {
    @IsEmail({}, { message: 'E-mail inválido'})
    email: string;

    @IsString()
    @MinLength(2, { message: 'O nome deve ter no mínimo 2 caracteres' }) 
    @MaxLength(50, { message: 'O nome deve ter no máximo 50 caracteres' }) 
    name: string;
}

import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
  @IsEmail({}, { message: 'E-mail inválido'})
  email: string;

  @IsString()
  @MinLength(4, { message: 'A senha deve ter no mínimo 4 caracteres' })
  @MaxLength(20, { message: 'A senha deve ter no máximo 20 caracteres' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha fraca: deve conter letras maiúsculas, minúsculas e números ou caracteres especiais',
  })
  password: string;

  @IsString()
  @MinLength(2, { message: 'O nome deve ter no mínimo 2 caracteres' }) 
  @MaxLength(50, { message: 'O nome deve ter no máximo 50 caracteres' }) 
  name: string;
}
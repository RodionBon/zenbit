import { IsEmail, IsString, MinLength } from 'class-validator';

class signInDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export default signInDto;

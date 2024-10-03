import { IsEmail, IsString, MinLength } from 'class-validator';

class signUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export default signUpDto;

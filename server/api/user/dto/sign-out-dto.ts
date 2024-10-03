import { IsEmail, IsString, MinLength } from 'class-validator';

class signOutDto {
  @IsEmail()
  email: string;
}

export default signOutDto;

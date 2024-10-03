import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Headers,
  Get,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import supabase from 'api/database';
import 'dotenv/config';

import { IsEmail, IsString, MinLength } from 'class-validator';

class signOutDto {
  @IsEmail()
  email: string;
}

class signInDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
class signUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

@Controller('user')
export class LoginController {
  @Get('test')
  async test() {
    return { a: 'asdfasdf' };
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: signUpDto) {
    const { data } = await supabase
      .from('user')
      .select('*')
      .eq('email', signUpDto.email);

    if (data.length !== 0) {
      throw new HttpException(
        { message: 'User already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(signUpDto.password, saltRounds);

    const response = await supabase
      .from('user')
      .insert({ email: signUpDto.email, password: hashedPassword });

    return { email: signUpDto.email };
  }

  @Get('get-user')
  async getUser(@Headers() headers: Record<string, string>) {
    const token = headers.authorization?.split(' ')[1];
    if (!token) {
      throw new HttpException({ message: 'No token' }, HttpStatus.FORBIDDEN);
    }
    // const { data: userData } = await supabase
    //   .from('user')
    //   .select('id')
    //   .eq('email', signOutDto.email);

    // if (userData.length === 0) {
    //   throw new HttpException(
    //     { message: 'User is not found' },
    //     HttpStatus.FORBIDDEN,
    //   );
    // }

    const { data: sessionData } = await supabase
      .from('session')
      .select()
      .eq('token', token);

    const { data: userData } = await supabase
      .from('user')
      .select()
      .eq('id', sessionData[0].user_id);

    return { user: userData[0] };
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: signInDto) {
    const { data } = await supabase
      .from('user')
      .select('*')
      .eq('email', signInDto.email);

    if (data.length === 0) {
      throw new HttpException(
        { message: 'User not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    if (!(await bcrypt.compare(signInDto.password, data[0].password))) {
      throw new HttpException(
        { message: 'Password is incorrect' },
        HttpStatus.FORBIDDEN,
      );
    }

    const token = this.generateJwtToken(signInDto.email);

    const response = await supabase.from('session').insert({
      user_id: data[0]['id'],
      token,
    });

    return { email: signInDto.email, token };
  }

  @Post('sign-out')
  async signOut(
    @Body() signOutDto: signOutDto,
    @Headers() headers: Record<string, string>,
  ) {
    const token = headers.authorization?.split(' ')[1];
    if (!token) {
      throw new HttpException({ message: 'No token' }, HttpStatus.FORBIDDEN);
    }
    // const { data: userData } = await supabase
    //   .from('user')
    //   .select('id')
    //   .eq('email', signOutDto.email);

    // if (userData.length === 0) {
    //   throw new HttpException(
    //     { message: 'User is not found' },
    //     HttpStatus.FORBIDDEN,
    //   );
    // }

    // const userId = userData[0].id;

    const { data: sessionData } = await supabase
      .from('session')
      .select('*')
      .eq('token', token);

    if (sessionData.length === 0) {
      throw new HttpException(
        { message: 'Session not found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (sessionData[0]['token'] !== token) {
      throw new HttpException({ message: 'Wrong token' }, HttpStatus.FORBIDDEN);
    }

    return { sessionData };
  }

  generateJwtToken(email: string) {
    const payload = { email };
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
    return token;
  }
}

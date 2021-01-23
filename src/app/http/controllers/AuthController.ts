import { Response } from 'express';
import { JsonController, Body, Post, Res } from 'routing-controllers';
import LoginRequest from '@request/user/CreateUserRequest';
import AppError from '@helper/AppError';
import Auth from '@helper/Auth';
import UserModel from '@model/UserModel';
import Responses from '@builder/Responses';

@JsonController('/auth')
export default class UserController {
  @Post('/login')
  public async login(@Body() request: LoginRequest, @Res() res: Response) {
    const { email, password } = request;

    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }

    const user = await UserModel.findOne({ email }).select('+password');

    if (!user || !(await user.auth(password))) {
      throw new AppError('Incorrect email or password', 401);
    }

    const token = Auth.jwtSign(user.id);
    return Responses.Success(res, { token });
  }
}

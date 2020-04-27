import { Response } from 'express';
import {
  JsonController,
  UseBefore,
  Body,
  Post,
  Param,
  Get,
  Put,
  Delete,
  Res,
} from 'routing-controllers';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import UserModel from '../models/UserModel';
import Responses from '../utils/builders/Responses';
import AppError from '../utils/helpers/AppError';

@JsonController('/users')
@UseBefore(AuthMiddleware)
export default class UserController {
  @Post()
  public async create(@Body() request: any, @Res() res: Response) {
    const user = await UserModel.create(request);
    return Responses.Success(res, user);
  }

  @Get()
  public async getAll(@Res() res: Response) {
    const users = await UserModel.find();
    return Responses.Success(res, { users });
  }

  @Get('/:id')
  public async getOne(@Param('id') id: string, @Res() res: Response) {
    const user = await UserModel.findById(id);
    if (!user) throw new AppError('User not found!', 404);
    return Responses.Success(res, { user });
  }

  @Put('/:id')
  public async update(
    @Param('id') id: string,
    @Body() request: any,
    @Res() res: Response
  ) {
    const user = await UserModel.findByIdAndUpdate(id, request, {
      new: true,
      runValidators: true,
    });
    if (!user) throw new AppError('User not found!', 404);
    return Responses.Success(res, { user });
  }

  @Delete('/:id')
  public async delete(@Param('id') id: string, @Res() res: Response) {
    const user = await UserModel.findOneAndUpdate(
      { _id: id, isDeleted: { $ne: true } },
      { isDeleted: true }
    );
    if (!user) throw new AppError('User not found!', 404);
    return Responses.Success(res, null, 'User has been deleted!');
  }
}

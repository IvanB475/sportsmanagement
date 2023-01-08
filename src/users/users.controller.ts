import { Controller } from '@nestjs/common';
import { Body, Delete, Param, Patch, Post, Response, UsePipes } from '@nestjs/common/decorators';
import { HttpException } from '@nestjs/common/exceptions';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { response } from 'express';
import { schema } from 'src/validation/joiSchema';
import { JoiValidationPipe } from 'src/validation/joiValidationPipe';
import { LoginDto } from './dtos/loginDto';
import { SignUpDto } from './dtos/signUpDto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @Post('sign-up')
    @ApiOperation({
        summary: 'user registration api',
        description: 'this route enables users to register to our app'
    })
    @ApiResponse({
        status: 400,
        description: 'Something went wrong, description will be provided in error message'
    })
    @ApiResponse({
        status: 201,
        description: 'You have successfully registered'
    })
    @UsePipes(new JoiValidationPipe(schema.signUp))
    private async signUpController(@Body() userData: SignUpDto) {
        try {

            return await this.usersService.signUpService(userData);
        } catch (err) {
            console.log(err);
            const ERR_MESSAGE = err.code == 23505 ? 'User with that username already exists' : 'Something went wrong';
            throw new HttpException(ERR_MESSAGE, 400);
        }
    }

    @Post('login')
    @ApiOperation({
        summary: 'login into app',
        description: 'this route enables both users and admins to login into our app'
    })
    @ApiResponse({
        status: 400,
        description: 'Something went wrong, description will be provided in error message'
    })
    @ApiResponse({
        status: 401,
        description: 'Wrong username or password'
    })
    @ApiResponse({
        status: 200,
        description: 'You have successfully logged in'
    })
    @UsePipes(new JoiValidationPipe(schema.login))
    private async loginController(@Body() userData: LoginDto, @Response() response: any) {
        try {
            const username = userData.username;
            const password = userData.password;
            const responseToUser = await this.usersService.loginService(username, password);
            return response.status(200).send(responseToUser);
        } catch (err) {
            console.log(err);
            if (err.status == 401) {
                throw new HttpException(err.response, err.status);
            }
            const ERR_MESSAGE = 'Something went wrong';
            throw new HttpException(ERR_MESSAGE, 400);
        }
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'admin - update user',
        description: 'this route enables admins to update users roles'
    })
    @ApiResponse({
        status: 400,
        description: 'Something went wrong, description will be provided in error message'
    })
    @ApiResponse({
        status: 200,
        description: 'Success'
    })
    private async updateUser(@Body('role') role: string, @Response() response: any, @Param('id') userId: number) {
        try {
            const responseToUser = await this.usersService.updateUser(userId, role);
            return response.status(200).send(responseToUser);
        } catch (err) {
            const ERR_MESSAGE = 'Failed to update user';
            throw new HttpException(ERR_MESSAGE, 400);
        }

    }

    @Delete(':id')
    @ApiOperation({
        summary: 'admin - delete user',
        description: 'this route enables admins to delete users'
    })
    @ApiResponse({
        status: 400,
        description: 'Something went wrong, description will be provided in error message'
    })
    @ApiResponse({
        status: 200,
        description: 'Success'
    })
    private async deleteUser(@Param('id') userId: number, @Response() response: any) {
        try {
            const responseToUser = await this.usersService.deleteUser(userId);
            return response.status(200).send(responseToUser);
        } catch (err) {
            console.log(err);
            const ERR_MESSAGE = 'Failed to delete user';
            throw new HttpException(ERR_MESSAGE, 400);
        }
    }

    //TODO: add edit and delete account routes for users
    //add create user endpoint for admins which would probably include adding support for OTP 
}

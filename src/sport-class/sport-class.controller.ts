import { Body, Controller, Delete, Get, Headers, HttpException, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils.service';
import { SportClassService } from './sport-class.service';

@Controller('sport-class')
export class SportClassController {
    constructor(private sportClassService: SportClassService,
        private utilsService: UtilsService) {

    }

    @Get('')
    private async fetchClasses(@Query() searchParams) {
        try {
            const { sport, age } = searchParams;
            return await this.sportClassService.fetchClasses(sport, age);
        } catch (err) {
            const ERR_MESSAGE = err.message || 'error occured while trying to fetch sport classes';
            const ERR_STATUS = 400;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS);
        }
    }

    @Get(':id')
    private async fetchClassDetails(@Param('id') classId: number) {
        try {
            return await this.sportClassService.fetchClassDetails(classId);
        } catch (err) {
            const ERR_MESSAGE = err.message || 'error occured while trying to fetch class details';
            const ERR_STATUS = 400;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS);
        }
    }

    @Put(':id/enroll')
    private async enrollInClass(@Param('id') classId: number, @Headers() headers) {
        try {
            const authToken = headers.authorization.split(' ')[1];
            const userId = this.utilsService.getUserIdFromToken(authToken);
            await this.sportClassService.enrollInClass(classId, userId);
            return { message: 'successfully enrolled in class' };
        } catch (err) {
            const ERR_MESSAGE = err.message || 'error occured while trying to enroll in class';
            const ERR_STATUS = 400;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS);
        }
    }

    @Put(':id/unenroll')
    private async unenrollClass(@Param('id') classId: number, @Headers() headers) {
        try {
            const authToken = headers.authorization.split(' ')[1];
            const userId = this.utilsService.getUserIdFromToken(authToken);
            await this.sportClassService.unenrollClass(classId, userId);
            return { message: 'successfully unenrolled class' };
        } catch (err) {
            const ERR_MESSAGE = err.message || 'error occured while trying to unenroll class';
            const ERR_STATUS = 400;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS);
        }
    }

    //API is set up for demonstrative purposes, currently supports updating description only
    //TODO: add support to edit any editable property of sport class
    @Patch(':id')
    private async editClass(@Param('id') classId: number, @Body('description') description: string) {
        try {
            await this.sportClassService.editClass(classId, description);
            return { message: 'success' };
        } catch (err) {
            const ERR_MESSAGE = err.message || 'error occured while trying to update class';
            const ERR_STATUS = 400;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS);
        }
    }

    @Delete(':id')
    private async deleteClass(@Param('id') classId: number) {
        try {
            await this.sportClassService.deleteClass(classId);
            return { message: 'success' };
        } catch (err) {
            const ERR_MESSAGE = err.message || 'error occured while trying to delete class';
            const ERR_STATUS = 400;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS);
        }
    }
    //TODO: add DTO & return type
    @Post('create')
    private async createClass(@Body() classInfo) {
        try {
            await this.sportClassService.createClass(classInfo);
            return { message: 'success' };
        } catch (err) {
            const ERR_MESSAGE = err.message || 'error occured while trying to create class';
            const ERR_STATUS = 400;
            throw new HttpException(ERR_MESSAGE, ERR_STATUS);
        }
    }
}

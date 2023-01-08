import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/User.entity';
import { EntityManager } from 'typeorm';
import { ClassAttendeesEntity } from './entities/ClassAttendees.entity';
import { SportClassEntity } from './entities/SportClass.entity';

@Injectable()
export class SportClassService {
    constructor(private entityManager: EntityManager) { }

    //TODO: add support for filtering by multiple sports or age groups
    //add support for case insensitive search
    async fetchClasses(sport: string, age: string) {
        const classes = await this.entityManager.find(SportClassEntity, { where: { sport, age } });
        return classes;
    }

    async fetchClassDetails(classId: number) {
        const sportClass = await this.entityManager.findOneBy(SportClassEntity, { id: classId });
        return sportClass;
    }

    //TODO: this should be in transaction, because for example:
    // user has 2 classes already, it will throw error that he cant join another one
    // but everything executed until the error is reached will be persisted in DB which shouldnt be the case
    async enrollInClass(classId: number, userId: number) {
        const sportClass = await this.entityManager.findOneBy(SportClassEntity, { id: classId });
        const user = await this.entityManager.findOneBy(UserEntity, { id: userId });
        const classAttendee = new ClassAttendeesEntity();
        classAttendee.attendee = user;
        classAttendee.class = sportClass;
        await classAttendee.save();

        sportClass.attendeesCount++;
        if (sportClass.attendeesCount > 10) {
            throw new BadRequestException('Class already has maximum of 10 attendees');
        }
        await sportClass.save();

        user.classesCount++;
        if (user.classesCount > 2) {
            throw new BadRequestException('You cant join more than 2 classes at the time');
        }
        await user.save();
    }


    async unenrollClass(classId: number, userId: number) {
        const sportClass = await this.entityManager.findOneBy(SportClassEntity, { id: classId });
        const user = await this.entityManager.findOneBy(UserEntity, { id: userId });
        const deleteResult = await this.entityManager.delete(ClassAttendeesEntity, { attendee: user, class: sportClass });
        if (deleteResult.affected > 0) {
            sportClass.attendeesCount--;
            await sportClass.save();
            user.classesCount--;
            await user.save();
        }
    }

    async editClass(classId: number, description: string) {
        const classToEdit = await this.entityManager.findOneBy(SportClassEntity, { id: classId });
        classToEdit.description = description;
        await classToEdit.save();
    }

    async deleteClass(classId: number) {
        await this.entityManager.delete(SportClassEntity, { id: classId });
    }

    async createClass(classInfo) {
        const { sport, age, description, schedule, duration } = classInfo;
        const newSportClass = new SportClassEntity();
        newSportClass.sport = sport;
        newSportClass.age = age;
        newSportClass.description = description;
        newSportClass.schedule = schedule;
        newSportClass.duration = duration;

        await newSportClass.save();

    }
}

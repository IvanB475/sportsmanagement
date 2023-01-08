import { UserEntity } from "src/users/entities/User.entity";
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SportClassEntity } from "./SportClass.entity";



@Entity({
    name: 'class_attendees'
})
export class ClassAttendeesEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, user => user.classAttendee)
    attendee: UserEntity;

    @ManyToOne(() => SportClassEntity, sportClass => sportClass.classAttendees)
    class: SportClassEntity;
}

import { Max, Min } from "class-validator";
import { ClassAttendeesEntity } from "src/sport-class/entities/ClassAttendees.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SignUpDto } from "../dtos/signUpDto";
import { RoleEntity } from "./Role.entity";


@Entity({
    name: 'users'
})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    //should be uuid
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    //should be unique
    @Column()
    email: string;

    @ManyToOne(() => RoleEntity, role => role.users)
    role: RoleEntity;

    @OneToMany(() => ClassAttendeesEntity, classAttendee => classAttendee.attendee)
    classAttendee: ClassAttendeesEntity;

    @Column({ default: 0 })
    @Min(0)
    @Max(2)
    classesCount: number;

    constructor(username: string, password: string, email: string) {
        super();
        this.username = username;
        this.password = password;
        this.email = email;
    }
}
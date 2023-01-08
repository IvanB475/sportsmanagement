import { Max, Min } from "class-validator";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClassAttendeesEntity } from "./ClassAttendees.entity";

// Improvements: sport and age should be either enums or even separate tables
// schedule should be jsonb
// duration should be number value in predefined metric (e.g. we store duration in minutes)
// id should be uuid
// createdAt, validAt, adminId (update, create) for tracking could be valuable in production app

@Entity({
    name: 'sport_classes'
})
export class SportClassEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sport: string;

    @Column()
    age: string;

    @Column({ nullable: true })
    schedule: string;

    @Column({ nullable: true })
    duration: string;

    @Column({ nullable: true })
    description: string;

    @Column({ default: 0 })
    @Min(0)
    @Max(10)
    attendeesCount: number;

    @OneToMany(() => ClassAttendeesEntity, CA => CA.class)
    classAttendees: ClassAttendeesEntity[];
}
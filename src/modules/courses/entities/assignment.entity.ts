import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";

@Entity()
export class Assignment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'timestamp', nullable: true })
    deadline: Date;

    @ManyToOne(() => Course, (course) => course.assignments)
    @JoinColumn({ name: 'course_id' })
    course: Course;

    @Column({ type: 'int' })
    course_id: number;

    @Column({ type: 'int' })
    creator_id: number;
}
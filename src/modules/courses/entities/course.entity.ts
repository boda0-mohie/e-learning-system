import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Lesson } from '../../courses/entities/lesson.entity';
import { AcademicYear, Major, Term } from 'utils/enum';
import { Enrollment } from 'src/modules/enrollments/entities/enrollment.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  instructorId: number;

  @Column()
  adminId: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: AcademicYear,
  })
  academicYear: AcademicYear;

  @Column({
    type: 'enum',
    enum: Major,
  })
  major: Major;

  @Column({
    type: 'enum',
    enum: Term,
  })
  term: Term;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Lesson, lesson => lesson.course, { cascade: true })
  lessons: Lesson[];

  @OneToMany(() => Enrollment, enrollment => enrollment.course)
  enrollments: Enrollment[];
}

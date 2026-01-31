import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { StudentProfile } from '../../profiles/studentProfile/entities/studentPofile.entity';
import { Course } from '../../courses/entities/course.entity';
import { EnrollmentStatus } from 'utils/enum';

@Entity('enrollments')
export class Enrollment {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => StudentProfile, student => student.enrollments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  profile: StudentProfile| number;

  @ManyToOne(() => Course, course => course.enrollments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: Course| number;

  @Column({
    type: 'enum',
    enum: EnrollmentStatus,
    default: EnrollmentStatus.ACTIVE,
  })
  status: EnrollmentStatus;

  @CreateDateColumn({ name: 'enrolled_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  enrolledAt: Date;
}

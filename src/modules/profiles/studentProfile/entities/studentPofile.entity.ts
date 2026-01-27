import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { AcademicYear, Major, Term } from 'utils/enum';

@Entity('student_profiles')
export class StudentProfile {

    @PrimaryColumn()
    id: number;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id' })
    user: User;

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

    @Column({
        type: 'decimal',
        precision: 3,
        scale: 2,
        default: 0,
    })
    gpa: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    photo: string;
}

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    Index
} from 'typeorm';
import { User } from './User.model';
import { TimeActivity } from './TimeActivity.model'; // Import related entity

@Entity('time_entries')
@Index(['employee_id', 'entry_date']) // Index from MySQL schema
@Index(['status']) // Index from MySQL schema
export class TimeEntry {
    @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'int', unsigned: true })
    employee_id!: number; // Foreign key

    @ManyToOne(() => User, { onDelete: 'CASCADE' }) // Assuming User has inverse relation 'timeEntries'
    @JoinColumn({ name: 'employee_id' })
    employee!: User;

    @Column({ type: 'date' })
    entry_date!: Date;

    @Column({ type: 'datetime' })
    clock_in!: Date;

    @Column({ type: 'datetime', nullable: true })
    clock_out?: Date;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    total_hours?: number; // Calculated

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    regular_hours?: number; // Calculated

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
    overtime_hours?: number; // Calculated

    @Column({
        type: 'enum',
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    })
    status!: 'pending' | 'approved' | 'rejected';

    @Column({ type: 'int', unsigned: true, nullable: true })
    approved_by?: number; // Foreign key

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'approved_by' })
    approvedBy?: User;

    @Column({ type: 'datetime', nullable: true })
    approved_at?: Date;

    @Column({ type: 'text', nullable: true })
    notes?: string;

    @CreateDateColumn({ type: 'datetime' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at!: Date;

    // --- Relationships ---

    @OneToMany(() => TimeActivity, activity => activity.timeEntry, { cascade: true })
    activities?: TimeActivity[];
}
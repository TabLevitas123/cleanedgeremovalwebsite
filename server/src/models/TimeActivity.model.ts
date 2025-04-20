import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { TimeEntry } from './TimeEntry.model';
import { Appointment } from './Appointment.model';

@Entity('time_activities')
export class TimeActivity {
    @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'int', unsigned: true })
    time_entry_id!: number; // Foreign key

    @ManyToOne(() => TimeEntry, timeEntry => timeEntry.activities, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'time_entry_id' })
    timeEntry!: TimeEntry;

    @Column({
        type: 'enum',
        enum: ['drive-to-job', 'work', 'lunch-break', 'drive-home']
    })
    type!: 'drive-to-job' | 'work' | 'lunch-break' | 'drive-home';

    @Column({ type: 'datetime' })
    start_time!: Date;

    @Column({ type: 'datetime', nullable: true })
    end_time?: Date;

    @Column({ type: 'int', unsigned: true, nullable: true })
    duration_minutes?: number; // Calculated

    @Column({ type: 'int', unsigned: true, nullable: true })
    appointment_id?: number; // Foreign key

    @ManyToOne(() => Appointment, { nullable: true, onDelete: 'SET NULL' }) // Assuming Appointment has inverse relation if needed
    @JoinColumn({ name: 'appointment_id' })
    appointment?: Appointment;

    @Column({ type: 'text', nullable: true })
    notes?: string;

    @Column({ type: 'boolean', nullable: true })
    is_driver?: boolean; // For drive activities

    @CreateDateColumn({ type: 'datetime' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at!: Date;
}
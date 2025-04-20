import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Appointment } from './Appointment.model';
import { User } from './User.model';

@Entity('appointment_photos')
export class AppointmentPhoto {
    @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'int', unsigned: true })
    appointment_id!: number; // Foreign key

    @ManyToOne(() => Appointment, appointment => appointment.photos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'appointment_id' })
    appointment!: Appointment;

    @Column({ type: 'enum', enum: ['before', 'after'] })
    photo_type!: 'before' | 'after';

    @Column({ type: 'varchar', length: 512 })
    photo_url!: string; // URL to the stored photo

    @CreateDateColumn({ type: 'datetime', name: 'uploaded_at' }) // Match MySQL schema name
    uploaded_at!: Date;

    @Column({ type: 'int', unsigned: true, nullable: true })
    uploaded_by?: number; // Foreign key

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'uploaded_by' })
    uploadedBy?: User;
}
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Unique
} from 'typeorm';
import { Appointment } from './Appointment.model';
import { Service } from './Service.model';

@Entity('appointment_services')
@Unique(['appointment_id', 'service_id']) // Ensure a service isn't added twice to the same appointment
export class AppointmentService {
    @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'int', unsigned: true })
    appointment_id!: number; // Foreign key

    @Column({ type: 'int', unsigned: true })
    service_id!: number; // Foreign key

    @ManyToOne(() => Appointment, appointment => appointment.appointmentServices, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'appointment_id' })
    appointment!: Appointment;

    @ManyToOne(() => Service, service => service.appointmentServices, { onDelete: 'CASCADE' }) // Assuming 'appointmentServices' relation on Service
    @JoinColumn({ name: 'service_id' })
    service!: Service;

    @Column({ type: 'decimal', precision: 8, scale: 2, default: 1.00 })
    quantity!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price!: number; // Price for this service * quantity at the time of booking

    @Column({ type: 'text', nullable: true })
    notes?: string;
}
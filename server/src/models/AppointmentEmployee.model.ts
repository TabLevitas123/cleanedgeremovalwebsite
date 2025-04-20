import {
    Entity,
    PrimaryColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Appointment } from './Appointment.model';
import { User } from './User.model';

@Entity('appointment_employees')
export class AppointmentEmployee {
    @PrimaryColumn({ type: 'int', unsigned: true })
    appointment_id!: number;

    @PrimaryColumn({ type: 'int', unsigned: true })
    employee_id!: number;

    @ManyToOne(() => Appointment, appointment => appointment.assignedEmployees, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'appointment_id' })
    appointment!: Appointment;

    @ManyToOne(() => User, { onDelete: 'CASCADE' }) // Assuming User entity has inverse relation if needed
    @JoinColumn({ name: 'employee_id' })
    employee!: User;

    // You could add columns here if needed, e.g., role_in_appointment
}
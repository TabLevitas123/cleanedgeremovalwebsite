import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    OneToMany, // Import relations as needed
    ManyToOne,
    JoinColumn
} from 'typeorm';
// Import related entities later, e.g.:
// import { Appointment } from './Appointment.model';
// import { TimeEntry } from './TimeEntry.model';
// import { AuditLog } from './AuditLog.model';
// import { Notification } from './Notification.model';
// import { Review } from './Review.model';
import { VehicleAssignment } from './VehicleAssignment.model'; // Join table
// import { VehicleAssignment } from './VehicleAssignment.model'; // Join table

@Entity('users')
@Index(['role'])
@Index(['active'])
@Index(['last_login'])
export class User {
    @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    username!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 255 })
    password!: string; // Hashed

    @Column({ type: 'varchar', length: 100 })
    first_name!: string;

    @Column({ type: 'varchar', length: 100 })
    last_name!: string;

    @Column({
        type: 'enum',
        enum: ['admin', 'employee', 'receptionist'],
    })
    role!: 'admin' | 'employee' | 'receptionist';

    @Column({ type: 'varchar', length: 255, nullable: true })
    address_street?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    address_city?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    address_state?: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    address_zip_code?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    address_country?: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    phone_home?: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    phone_cell?: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    phone_work?: string;

    @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
    employee_id?: string; // For employees only

    @Column({ type: 'varchar', length: 512, nullable: true })
    profile_image_url?: string;

    @Column({ type: 'datetime', nullable: true })
    last_login?: Date;

    @Column({ type: 'boolean', default: true })
    active!: boolean;

    @Column({ type: 'boolean', default: false })
    mfa_enabled!: boolean;

    @Column({ type: 'varchar', length: 255, nullable: true })
    mfa_secret?: string;

    @Column({ type: 'text', nullable: true })
    refresh_token?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    password_reset_token?: string;

    @Column({ type: 'datetime', nullable: true })
    password_reset_expires?: Date;

    @Column({ type: 'int', unsigned: true, default: 0 })
    login_attempts!: number;

    @Column({ type: 'datetime', nullable: true })
    lock_until?: Date;

    @CreateDateColumn({ type: 'datetime' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at!: Date;

    // --- Relationships ---

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'created_by' })
    createdBy?: User;

    @Column({ type: 'int', unsigned: true, nullable: true })
    created_by?: number; // Foreign key column

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'updated_by' })
    updatedBy?: User;

    @Column({ type: 'int', unsigned: true, nullable: true })
    updated_by?: number; // Foreign key column

    // Example One-to-Many (Inverse side) - Uncomment and import when related entities are defined
    // @OneToMany(() => TimeEntry, timeEntry => timeEntry.employee)
    // timeEntries?: TimeEntry[];

    // @OneToMany(() => Appointment, appointment => appointment.createdBy)
    // createdAppointments?: Appointment[];

    // @OneToMany(() => Appointment, appointment => appointment.updatedBy)
    // updatedAppointments?: Appointment[];

    // @OneToMany(() => AppointmentEmployee, appointmentEmployee => appointmentEmployee.employee) // Join table
    // assignedAppointments?: AppointmentEmployee[];


    @OneToMany(() => VehicleAssignment, vehicleAssignment => vehicleAssignment.employee) // Join table
    assignedVehicles?: VehicleAssignment[];

    // @OneToMany(() => VehicleAssignment, vehicleAssignment => vehicleAssignment.employee) // Join table
    // assignedVehicles?: VehicleAssignment[];

    // @OneToMany(() => Review, review => review.respondedBy)
    // respondedReviews?: Review[];

    // @OneToMany(() => Notification, notification => notification.recipient)
    // notifications?: Notification[];

    // @OneToMany(() => Notification, notification => notification.createdBy)
    // createdNotifications?: Notification[];

    // @OneToMany(() => AuditLog, auditLog => auditLog.user)
    // auditLogs?: AuditLog[];

}
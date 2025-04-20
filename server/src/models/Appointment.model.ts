import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    Index,
    OneToOne // For Review potentially
} from 'typeorm';
import { Customer } from './Customer.model';
import { CustomerServiceAddress } from './CustomerServiceAddress.model';
import { Vehicle } from './Vehicle.model';
import { User } from './User.model';
import { AppointmentService } from './AppointmentService.model'; // Join table
import { AppointmentEmployee } from './AppointmentEmployee.model'; // Join table
import { AppointmentPhoto } from './AppointmentPhoto.model';
import { Review } from './Review.model';

@Entity('appointments')
@Index(['customer_id'])
@Index(['scheduled_start'])
@Index(['status'])
@Index(['assigned_vehicle_id'])
@Index(['service_address_zip_code']) // Index from MySQL schema
export class Appointment {
    @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'int', unsigned: true })
    customer_id!: number; // Foreign key

    @ManyToOne(() => Customer, customer => customer.appointments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'customer_id' })
    customer!: Customer;

    // Option 1: Link to a specific service address record
    @Column({ type: 'int', unsigned: true, nullable: true })
    service_address_id?: number; // Foreign key

    @ManyToOne(() => CustomerServiceAddress, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'service_address_id' })
    serviceAddressRecord?: CustomerServiceAddress;

    // Option 2: Store address directly (denormalized, as in MySQL schema)
    @Column({ type: 'varchar', length: 255 })
    service_address_street!: string;

    @Column({ type: 'varchar', length: 100 })
    service_address_city!: string;

    @Column({ type: 'varchar', length: 50 })
    service_address_state!: string;

    @Column({ type: 'varchar', length: 20 })
    service_address_zip_code!: string;

    @Column({ type: 'varchar', length: 50 })
    service_address_country!: string;
    // --- End Address Options ---

    @Column({ type: 'datetime' })
    scheduled_start!: Date;

    @Column({ type: 'datetime' })
    scheduled_end!: Date;

    @Column({ type: 'int', unsigned: true })
    estimated_duration!: number; // In minutes

    @Column({
        type: 'enum',
        enum: ['scheduled', 'in-progress', 'completed', 'cancelled', 'no-show'],
        default: 'scheduled',
    })
    status!: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';

    @Column({ type: 'int', unsigned: true, nullable: true })
    assigned_vehicle_id?: number; // Foreign key

    @ManyToOne(() => Vehicle, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'assigned_vehicle_id' })
    assignedVehicle?: Vehicle;

    @Column({ type: 'text', nullable: true })
    notes?: string;

    @Column({ type: 'varchar', length: 512, nullable: true })
    customer_signature_url?: string;

    @Column({
        type: 'enum',
        enum: ['pending', 'partial', 'paid', 'refunded'],
        default: 'pending',
    })
    payment_status!: 'pending' | 'partial' | 'paid' | 'refunded';

    @Column({
        type: 'enum',
        enum: ['cash', 'credit', 'check', 'online'],
        nullable: true,
    })
    payment_method?: 'cash' | 'credit' | 'check' | 'online';

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    payment_amount?: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    payment_transaction_id?: string;

    @Column({ type: 'varchar', length: 512, nullable: true })
    payment_receipt_url?: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_price!: number;

    @Column({
        type: 'enum',
        enum: ['percentage', 'fixed'],
        nullable: true,
    })
    discount_type?: 'percentage' | 'fixed';

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    discount_value?: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    discount_reason?: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    final_price!: number;

    @Column({ type: 'tinyint', unsigned: true, nullable: true })
    rating?: number; // 1-5 stars

    @Column({ type: 'text', nullable: true })
    feedback?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    calendar_event_id?: string; // Google Calendar event ID

    @Column({ type: 'boolean', default: false })
    reminder_sent!: boolean;

    @Column({ type: 'datetime', nullable: true })
    reminder_sent_at?: Date;

    @Column({ type: 'boolean', default: false })
    confirmation_sent!: boolean;

    @Column({ type: 'datetime', nullable: true })
    confirmation_sent_at?: Date;

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

    // Many-to-Many for Services via AppointmentService join entity
    @OneToMany(() => AppointmentService, appointmentService => appointmentService.appointment, { cascade: true })
    appointmentServices?: AppointmentService[];

    // Many-to-Many for Employees via AppointmentEmployee join entity
    @OneToMany(() => AppointmentEmployee, appointmentEmployee => appointmentEmployee.appointment, { cascade: ['insert'] }) // Only cascade inserts
    assignedEmployees?: AppointmentEmployee[];

    // One-to-Many for Photos
    @OneToMany(() => AppointmentPhoto, photo => photo.appointment, { cascade: true })
    photos?: AppointmentPhoto[];

    // One-to-One for Review (assuming one review per appointment)
    @OneToOne(() => Review, review => review.appointment, { nullable: true })
    review?: Review;
}
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToOne, // Assuming one review per appointment
    JoinColumn,
    Index
} from 'typeorm';
import { Customer } from './Customer.model';
import { Appointment } from './Appointment.model';
import { User } from './User.model';

@Entity('reviews')
@Index(['customer_id'])
@Index(['appointment_id'])
@Index(['rating'])
@Index(['status'])
@Index(['featured'])
@Index(['service_date'])
export class Review {
    @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'int', unsigned: true })
    customer_id!: number; // Foreign key

    @ManyToOne(() => Customer, customer => customer.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'customer_id' })
    customer!: Customer;

    @Column({ type: 'int', unsigned: true, nullable: true })
    appointment_id?: number; // Foreign key

    // Assuming OneToOne relation: one review per appointment
    @OneToOne(() => Appointment, appointment => appointment.review, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'appointment_id' })
    appointment?: Appointment;

    @Column({ type: 'tinyint', unsigned: true })
    rating!: number; // 1-5 stars

    @Column({ type: 'varchar', length: 255, nullable: true })
    title?: string;

    @Column({ type: 'text' })
    content!: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    service_type?: string; // Denormalized

    @Column({ type: 'date', nullable: true })
    service_date?: Date; // Denormalized

    @Column({ type: 'text', nullable: true })
    response_content?: string;

    @Column({ type: 'datetime', nullable: true })
    response_date?: Date;

    @Column({ type: 'int', unsigned: true, nullable: true })
    responded_by?: number; // Foreign key

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'responded_by' })
    respondedBy?: User;

    @Column({
        type: 'enum',
        enum: ['pending', 'approved', 'rejected', 'featured'],
        default: 'pending',
    })
    status!: 'pending' | 'approved' | 'rejected' | 'featured';

    @Column({ type: 'boolean', default: false })
    featured!: boolean;

    @Column({ type: 'boolean', default: false })
    verified!: boolean; // Indicates if linked to a completed appointment

    @Column({ type: 'boolean', default: false })
    anonymous!: boolean;

    @CreateDateColumn({ type: 'datetime' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at!: Date;
}
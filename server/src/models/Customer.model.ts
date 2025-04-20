import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    OneToMany,
    ManyToOne,
    JoinColumn,
    ManyToMany, // For tags
    JoinTable   // For tags
} from 'typeorm';
import { User } from './User.model';
import { CustomerServiceAddress } from './CustomerServiceAddress.model';
import { Appointment } from './Appointment.model';
import { Review } from './Review.model';
import { Tag } from './Tag.model'; // Import Tag entity

@Entity('customers')
@Index(['last_name', 'first_name'])
@Index(['customer_since'])
@Index(['last_service_date'])
export class Customer {
    @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'varchar', length: 100 })
    first_name!: string;

    @Column({ type: 'varchar', length: 100 })
    last_name!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 255 })
    primary_address_street!: string;

    @Column({ type: 'varchar', length: 100 })
    primary_address_city!: string;

    @Column({ type: 'varchar', length: 50 })
    primary_address_state!: string;

    @Column({ type: 'varchar', length: 20 })
    primary_address_zip_code!: string;

    @Column({ type: 'varchar', length: 50 })
    primary_address_country!: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    phone_home?: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    phone_cell?: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    phone_work?: string;

    @Column({ type: 'text', nullable: true })
    notes?: string;

    @Column({ type: 'boolean', default: false })
    marketing_consent!: boolean;

    @Column({ type: 'datetime', nullable: true })
    marketing_consent_date?: Date;

    @Column({ type: 'boolean', default: false })
    privacy_policy_agreed!: boolean;

    @Column({ type: 'datetime', nullable: true }) // Should likely be NOT NULL if required on creation
    privacy_policy_agreed_date?: Date;

    @CreateDateColumn({ type: 'datetime', name: 'customer_since' }) // Use CreateDateColumn for customer_since
    customer_since!: Date;

    @Column({ type: 'datetime', nullable: true })
    last_service_date?: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    total_spent!: number;

    @Column({ type: 'int', unsigned: true, default: 0 })
    appointment_count!: number;

    @Column({ type: 'boolean', default: true })
    active!: boolean;

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

    @OneToMany(() => CustomerServiceAddress, serviceAddress => serviceAddress.customer, { cascade: true }) // Cascade saves/updates/deletes
    serviceAddresses?: CustomerServiceAddress[];

    @OneToMany(() => Appointment, appointment => appointment.customer)
    appointments?: Appointment[];

    @OneToMany(() => Review, review => review.customer)
    reviews?: Review[];

    @ManyToMany(() => Tag, { cascade: ['insert'] }) // Cascade insert for new tags
    @JoinTable({
        name: 'customer_tags', // Name of the join table
        joinColumn: { name: 'customer_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
    })
    tags?: Tag[];
}
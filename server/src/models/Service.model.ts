import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';
import { User } from './User.model';
import { AppointmentService } from './AppointmentService.model'; // Join table

@Entity('services')
@Index(['category'])
@Index(['active'])
@Index(['featured'])
@Index(['sort_order'])
export class Service {
    @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'text' })
    description!: string;

    @Column({
        type: 'enum',
        enum: [
            'junk-removal', 'cleanout', 'relocation', 'recycling', 'handyman',
            'donation', 'industrial-cleaning', 'industrial-painting',
            'monument-cleaning', 'dumpster-cleaning', 'specialty'
        ]
    })
    category!: 'junk-removal' | 'cleanout' | 'relocation' | 'recycling' | 'handyman' | 'donation' | 'industrial-cleaning' | 'industrial-painting' | 'monument-cleaning' | 'dumpster-cleaning' | 'specialty';

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    base_price!: number;

    @Column({
        type: 'enum',
        enum: ['fixed', 'hourly', 'volume', 'weight', 'custom']
    })
    pricing_model!: 'fixed' | 'hourly' | 'volume' | 'weight' | 'custom';

    @Column({ type: 'json', nullable: true })
    pricing_details?: {
        minimumCharge?: number;
        hourlyRate?: number;
        volumeRate?: number; // Per cubic yard
        weightRate?: number; // Per pound
        customFormula?: string;
    };

    @Column({ type: 'int', unsigned: true })
    estimated_duration!: number; // In minutes

    @Column({ type: 'varchar', length: 512, nullable: true })
    icon_url?: string;

    @Column({ type: 'varchar', length: 512, nullable: true })
    image_url?: string;

    @Column({ type: 'boolean', default: true })
    active!: boolean;

    @Column({ type: 'boolean', default: false })
    featured!: boolean;

    @Column({ type: 'int', unsigned: true, default: 0 })
    sort_order!: number;

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

    // Many-to-Many for Appointments via AppointmentService join entity
    @OneToMany(() => AppointmentService, appointmentService => appointmentService.service)
    appointmentServices?: AppointmentService[];
}
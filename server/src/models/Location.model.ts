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
import { LocationBusinessHours } from './LocationBusinessHours.model'; // Import related entity

@Entity('locations')
@Index(['type'])
@Index(['address_zip_code'])
@Index(['active'])
// Add spatial index later if needed: @Index({ spatial: true })
export class Location {
    @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({
        type: 'enum',
        enum: ['service-area', 'headquarters', 'warehouse', 'partner-location']
    })
    type!: 'service-area' | 'headquarters' | 'warehouse' | 'partner-location';

    @Column({ type: 'varchar', length: 255 })
    address_street!: string;

    @Column({ type: 'varchar', length: 100 })
    address_city!: string;

    @Column({ type: 'varchar', length: 50 })
    address_state!: string;

    @Column({ type: 'varchar', length: 20 })
    address_zip_code!: string;

    @Column({ type: 'varchar', length: 50 })
    address_country!: string;

    @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
    latitude?: number;

    @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
    longitude?: number;

    @Column({
        type: 'enum',
        enum: ['polygon', 'radius'],
        nullable: true
    })
    service_area_type?: 'polygon' | 'radius';

    @Column({ type: 'json', nullable: true })
    service_area_details?: {
        polygon?: { latitude: number; longitude: number }[];
        radius?: number; // In miles
        center?: { latitude: number; longitude: number };
    };

    @Column({ type: 'varchar', length: 30, nullable: true })
    contact_phone?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    contact_email?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    contact_website?: string;

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

    @OneToMany(() => LocationBusinessHours, hours => hours.location, { cascade: true })
    businessHours?: LocationBusinessHours[];
}
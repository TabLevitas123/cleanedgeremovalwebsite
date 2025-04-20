import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    OneToMany,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { User } from './User.model';
import { Appointment } from './Appointment.model';
import { VehicleMaintenanceHistory } from './VehicleMaintenanceHistory.model';
import { VehicleFuelLog } from './VehicleFuelLog.model';
import { VehicleDocument } from './VehicleDocument.model';
import { VehicleAssignment } from './VehicleAssignment.model'; // Join table

@Entity('vehicles')
@Index(['status'])
@Index(['active'])
// Add spatial index later if needed: @Index({ spatial: true })
export class Vehicle {
    @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'varchar', length: 100 })
    name!: string;

    @Column({ type: 'enum', enum: ['truck', 'van', 'car', 'other'] })
    type!: 'truck' | 'van' | 'car' | 'other';

    @Column({ type: 'varchar', length: 20, unique: true })
    license_plate!: string;

    @Column({ type: 'varchar', length: 50 })
    make!: string;

    @Column({ type: 'varchar', length: 50 })
    model!: string;

    @Column({ type: 'int', unsigned: true })
    year!: number;

    @Column({ type: 'varchar', length: 30, nullable: true })
    color?: string;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
    capacity?: number; // In cubic yards

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    max_weight?: number; // In pounds

    @Column({
        type: 'enum',
        enum: ['available', 'in-use', 'maintenance', 'out-of-service'],
        default: 'available',
    })
    status!: 'available' | 'in-use' | 'maintenance' | 'out-of-service';

    // Using separate columns for lat/lon as Point type might require specific setup
    @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
    current_latitude?: number;

    @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
    current_longitude?: number;

    @Column({ type: 'datetime', nullable: true })
    current_location_last_updated?: Date;

    @Column({ type: 'varchar', length: 100, nullable: true })
    insurance_provider?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    insurance_policy_number?: string;

    @Column({ type: 'date', nullable: true })
    insurance_expiration_date?: Date;

    @Column({ type: 'date', nullable: true })
    registration_expiration_date?: Date;

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

    @OneToMany(() => Appointment, appointment => appointment.assignedVehicle)
    appointments?: Appointment[];

    @OneToMany(() => VehicleMaintenanceHistory, history => history.vehicle, { cascade: true })
    maintenanceHistory?: VehicleMaintenanceHistory[];

    @OneToMany(() => VehicleFuelLog, log => log.vehicle, { cascade: true })
    fuelLog?: VehicleFuelLog[];

    @OneToMany(() => VehicleDocument, doc => doc.vehicle, { cascade: true })
    documents?: VehicleDocument[];

    // Many-to-Many for Employees via VehicleAssignment join entity
    @OneToMany(() => VehicleAssignment, vehicleAssignment => vehicleAssignment.vehicle, { cascade: ['insert'] })
    assignedEmployees?: VehicleAssignment[];
}
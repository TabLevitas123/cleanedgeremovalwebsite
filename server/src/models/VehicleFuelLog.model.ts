import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Vehicle } from './Vehicle.model';
import { User } from './User.model';

@Entity('vehicle_fuel_log')
export class VehicleFuelLog {
    @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'int', unsigned: true })
    vehicle_id!: number; // Foreign key

    @ManyToOne(() => Vehicle, vehicle => vehicle.fuelLog, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'vehicle_id' })
    vehicle!: Vehicle;

    @Column({ type: 'date' })
    log_date!: Date;

    @Column({ type: 'decimal', precision: 8, scale: 3 }) // Allow for fractional gallons
    gallons!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    cost!: number;

    @Column({ type: 'int', unsigned: true })
    odometer!: number;

    @CreateDateColumn({ type: 'datetime' })
    created_at!: Date;

    @Column({ type: 'int', unsigned: true, nullable: true })
    created_by?: number; // Foreign key

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'created_by' })
    createdBy?: User;
}
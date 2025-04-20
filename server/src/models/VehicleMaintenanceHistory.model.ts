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

@Entity('vehicle_maintenance_history')
export class VehicleMaintenanceHistory {
    @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'int', unsigned: true })
    vehicle_id!: number; // Foreign key

    @ManyToOne(() => Vehicle, vehicle => vehicle.maintenanceHistory, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'vehicle_id' })
    vehicle!: Vehicle;

    @Column({ type: 'date' })
    maintenance_date!: Date;

    @Column({ type: 'enum', enum: ['routine', 'repair', 'inspection'] })
    type!: 'routine' | 'repair' | 'inspection';

    @Column({ type: 'text' })
    description!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    cost?: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    provider?: string;

    @Column({ type: 'text', nullable: true })
    notes?: string;

    @CreateDateColumn({ type: 'datetime' })
    created_at!: Date;

    @Column({ type: 'int', unsigned: true, nullable: true })
    created_by?: number; // Foreign key

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'created_by' })
    createdBy?: User;
}
import {
    Entity,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn
} from 'typeorm';
import { Vehicle } from './Vehicle.model';
import { User } from './User.model';

@Entity('vehicle_assignments')
export class VehicleAssignment {
    @PrimaryColumn({ type: 'int', unsigned: true })
    vehicle_id!: number;

    @PrimaryColumn({ type: 'int', unsigned: true })
    employee_id!: number;

    @ManyToOne(() => Vehicle, vehicle => vehicle.assignedEmployees, { onDelete: 'CASCADE' }) // Removed primary: true
    @JoinColumn({ name: 'vehicle_id' })
    vehicle!: Vehicle;

    @ManyToOne(() => User, user => user.assignedVehicles, { onDelete: 'CASCADE' }) // Removed primary: true, Assuming 'assignedVehicles' relation exists on User
    @JoinColumn({ name: 'employee_id' })
    employee!: User;

    @CreateDateColumn({ type: 'datetime', name: 'assigned_at' }) // Match MySQL schema name
    assigned_at!: Date;
}
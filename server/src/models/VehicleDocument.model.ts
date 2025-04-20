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

@Entity('vehicle_documents')
export class VehicleDocument {
    @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'int', unsigned: true })
    vehicle_id!: number; // Foreign key

    @ManyToOne(() => Vehicle, vehicle => vehicle.documents, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'vehicle_id' })
    vehicle!: Vehicle;

    @Column({ type: 'enum', enum: ['insurance', 'registration', 'other'] })
    document_type!: 'insurance' | 'registration' | 'other';

    @Column({ type: 'varchar', length: 512 })
    document_url!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description?: string;

    @CreateDateColumn({ type: 'datetime', name: 'uploaded_at' }) // Match MySQL schema name
    uploaded_at!: Date;

    @Column({ type: 'int', unsigned: true, nullable: true })
    uploaded_by?: number; // Foreign key

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'uploaded_by' })
    uploadedBy?: User;
}
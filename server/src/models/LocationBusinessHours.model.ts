import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Unique
} from 'typeorm';
import { Location } from './Location.model';

@Entity('location_business_hours')
@Unique(['location_id', 'day_of_week']) // Match MySQL schema constraint
export class LocationBusinessHours {
    @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'int', unsigned: true })
    location_id!: number; // Foreign key

    @ManyToOne(() => Location, location => location.businessHours, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'location_id' })
    location!: Location;

    @Column({
        type: 'enum',
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    })
    day_of_week!: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

    @Column({ type: 'time', nullable: true }) // Use TIME type for HH:MM
    open_time?: string;

    @Column({ type: 'time', nullable: true }) // Use TIME type for HH:MM
    close_time?: string;

    @Column({ type: 'boolean', default: false })
    is_closed!: boolean;
}
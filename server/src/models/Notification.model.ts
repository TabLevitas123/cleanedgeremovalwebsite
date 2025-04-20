import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    Index
} from 'typeorm';
import { User } from './User.model';

@Entity('notifications')
@Index(['recipient_id', 'is_read']) // Index from MySQL schema
@Index(['priority']) // Index from MySQL schema
@Index(['created_at']) // Index from MySQL schema
@Index(['expires_at']) // Index from MySQL schema
export class Notification {
    @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'int', unsigned: true })
    recipient_id!: number; // Foreign key

    @ManyToOne(() => User, { onDelete: 'CASCADE' }) // Assuming User has inverse relation 'notifications'
    @JoinColumn({ name: 'recipient_id' })
    recipient!: User;

    @Column({ type: 'enum', enum: ['appointment', 'system', 'message', 'alert'] })
    type!: 'appointment' | 'system' | 'message' | 'alert';

    @Column({ type: 'varchar', length: 255 })
    title!: string;

    @Column({ type: 'text' })
    content!: string;

    @Column({ type: 'varchar', length: 50, nullable: true }) // e.g., 'appointment', 'customer'
    related_model?: string;

    @Column({ type: 'int', unsigned: true, nullable: true })
    related_id?: number; // Cannot have direct FK due to multiple possible tables

    @Column({
        type: 'enum',
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium',
    })
    priority!: 'low' | 'medium' | 'high' | 'critical';

    @Column({ type: 'boolean', default: false, name: 'is_read' }) // Match MySQL schema name
    is_read!: boolean;

    @Column({ type: 'datetime', nullable: true })
    read_at?: Date;

    @Column({ type: 'datetime', nullable: true })
    expires_at?: Date; // For TTL index

    @Column({ type: 'json', nullable: true })
    actions?: { label: string; url: string }[];

    @CreateDateColumn({ type: 'datetime' })
    created_at!: Date;

    @Column({ type: 'int', unsigned: true, nullable: true })
    created_by?: number; // Foreign key

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' }) // Assuming User has inverse relation 'createdNotifications'
    @JoinColumn({ name: 'created_by' })
    createdBy?: User;
}
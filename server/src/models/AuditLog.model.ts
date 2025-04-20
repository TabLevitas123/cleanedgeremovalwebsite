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

@Entity('audit_logs')
@Index(['user_id']) // Index from MySQL schema
@Index(['action']) // Index from MySQL schema
@Index(['resource_model', 'resource_id']) // Index from MySQL schema
@Index(['timestamp']) // Index from MySQL schema
export class AuditLog {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true }) // Use BIGINT for potentially large tables
    id!: string; // TypeORM uses string for bigint

    @Column({ type: 'int', unsigned: true, nullable: true })
    user_id?: number; // Foreign key, nullable for system actions

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' }) // Assuming User has inverse relation 'auditLogs'
    @JoinColumn({ name: 'user_id' })
    user?: User;

    @Column({
        type: 'enum',
        enum: ['create', 'read', 'update', 'delete', 'login', 'logout', 'export', 'import', 'other']
    })
    action!: 'create' | 'read' | 'update' | 'delete' | 'login' | 'logout' | 'export' | 'import' | 'other';

    @Column({ type: 'varchar', length: 50 })
    resource_model!: string; // e.g., 'user', 'customer', 'appointment'

    @Column({ type: 'int', unsigned: true, nullable: true })
    resource_id?: number; // ID of the affected resource

    @Column({ type: 'text' })
    description!: string;

    @Column({ type: 'json', nullable: true })
    details?: any; // JSON object with details like changed fields

    @Column({ type: 'varchar', length: 45, nullable: true })
    ip_address?: string;

    @Column({ type: 'text', nullable: true })
    user_agent?: string;

    @CreateDateColumn({ type: 'datetime', name: 'timestamp' }) // Match MySQL schema name
    timestamp!: Date;
}
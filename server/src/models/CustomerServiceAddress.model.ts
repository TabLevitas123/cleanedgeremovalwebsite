import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Index
} from 'typeorm';
import { Customer } from './Customer.model';

@Entity('customer_service_addresses')
@Index(['zip_code']) // Index based on the MySQL schema definition
export class CustomerServiceAddress {
    @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'int', unsigned: true })
    customer_id!: number; // Foreign key column

    @ManyToOne(() => Customer, customer => customer.serviceAddresses, { onDelete: 'CASCADE' }) // Define relation
    @JoinColumn({ name: 'customer_id' }) // Specify the foreign key column name
    customer!: Customer;

    @Column({ type: 'varchar', length: 100, nullable: true })
    nickname?: string;

    @Column({ type: 'varchar', length: 255 })
    street!: string;

    @Column({ type: 'varchar', length: 100 })
    city!: string;

    @Column({ type: 'varchar', length: 50 })
    state!: string;

    @Column({ type: 'varchar', length: 20 })
    zip_code!: string;

    @Column({ type: 'varchar', length: 50 })
    country!: string;

    @Column({ type: 'boolean', default: false })
    is_default!: boolean;

    @CreateDateColumn({ type: 'datetime' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at!: Date;
}
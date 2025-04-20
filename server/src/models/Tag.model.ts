import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany
} from 'typeorm';
import { Customer } from './Customer.model'; // Import Customer for ManyToMany relation

@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    name!: string;

    // --- Relationships ---

    @ManyToMany(() => Customer, customer => customer.tags)
    // No @JoinTable here, it's defined on the owning side (Customer)
    customers?: Customer[];
}
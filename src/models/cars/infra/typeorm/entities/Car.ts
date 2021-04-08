import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Category from './Category';
import Specification from './Specification';

@Entity('cars')
class Car {
    @PrimaryColumn('uuid')
    public id: string;

    @Column()
    public name: string;

    @Column()
    public description: string;

    @Column()
    public daily_rate: number;

    @Column()
    public license_plate: string;

    @Column()
    public fine_amount: number;

    @Column()
    public brand: string;

    @Column()
    public available: boolean;

    @Column()
    public category_id: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    public category: Category;

    @ManyToMany(() => Specification)
    @JoinTable({
        name: 'specifications_cars',
        joinColumns: [{ name: 'car_id' }],
        inverseJoinColumns: [{ name: 'specification_id' }],
    })
    specifications: Specification[];

    @CreateDateColumn()
    public created_at: string;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
            this.available = true;
        }
    }
}

export default Car;

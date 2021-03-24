import { v4 as uuidV4 } from 'uuid';
import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('categories')
class Category {
    @PrimaryColumn('uuid')
    public id?: string;

    @Column()
    public name: string;

    @Column()
    public description: string;

    @CreateDateColumn()
    public created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export default Category;

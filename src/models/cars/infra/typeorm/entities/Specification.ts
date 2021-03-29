import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('specifications')
class Specification {
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

export default Specification;

import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('cars-image')
class CarImage {
    @PrimaryColumn('uuid')
    public id: string;

    @Column('uuid')
    public car_id: string;

    @Column()
    public image_name: string;

    @CreateDateColumn()
    public created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export default CarImage;

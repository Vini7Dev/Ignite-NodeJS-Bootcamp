import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
class User {
    @PrimaryColumn('uuid')
    public id: string;

    @Column()
    public name: string;

    @Column()
    public password: string;

    @Column()
    public email: string;

    @Column()
    public driver_license: string;

    @Column('boolean')
    public is_admin: boolean;

    @CreateDateColumn()
    public created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export default User;

import { Expose } from 'class-transformer';
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

    @Column()
    public avatar: string;

    @CreateDateColumn()
    public created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }

    @Expose({ name: 'avatar_url' })
    public avatar_url(): string {
        switch (process.env.DISK) {
            case 'local':
                return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
            case 's3':
                return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
            default:
                return null;
        }
    }
}

export default User;

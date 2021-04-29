import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import User from './User';

@Entity('users_tokens')
class UserToken {
    @PrimaryColumn('uuid')
    public id: string;

    @Column()
    public refresh_token: string;

    @Column('timestamp')
    public expires_date: Date;

    @Column('uuid')
    public user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    public user: User;

    @CreateDateColumn()
    public created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export default UserToken;

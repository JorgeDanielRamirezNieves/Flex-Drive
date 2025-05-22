import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/models/user';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('login')
export class Login {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'id_user', type: 'varchar', nullable: false })
  @ApiProperty({
    name: 'idUser',
    description: "User's ID",
    required: true,
    example: 'CREATE AN USER AND USE ITS UUID',
  })
  public idUser: string;

  @Column('text', {
    // unique: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  login_date: Date;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @OneToOne(() => User, (objUser) => objUser.uuid)
  @JoinColumn({ name: 'id_user', referencedColumnName: 'uuid' })
  public User: User;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @CreateDateColumn()
  created_at: Date;
}

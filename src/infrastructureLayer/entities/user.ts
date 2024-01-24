import { Entity, Column } from "typeorm";
import { Auth } from "./utils/auth";
import { Length } from "class-validator";

@Entity()
export class Users extends Auth {
  @Column({
    nullable: false,
  })
  @Length(3, 255, {
    message: "Username must have a minimum length of 3 characters",
  })
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  @Length(3, 255, {
    message: "Username must have a minimum length of 3 characters",
  })
  username: string;

  @Column({
    nullable: true,
  })
  profile: string;

  @Column({
    nullable: true,
  })
  about: string;

  @Column({
    nullable: true,
  })
  education: string;

  @Column({
    default: "user",
    nullable: false,
  })
  role: string;

  @Column({
    default: false,
  })
  blocked: boolean;
}

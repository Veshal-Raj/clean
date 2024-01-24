import { Entity, Column } from "typeorm";
import { Auth } from "./utils/auth";

@Entity()
export class Admin extends Auth {
  @Column({
    default: "admin",
    nullable: false,
  })
  role: string;
}

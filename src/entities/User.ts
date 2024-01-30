//importing decorator from typeorm
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
//decorator is feature of ts that allow developers to apply logic to a class , a class properties , method or a method parameter in a declartive manner at  design time
//parameter intialized inside classs give error
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: String;

  @Column()
  lastName: string;

  @Column()
  email: string;
}

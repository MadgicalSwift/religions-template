import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: false })
  mobileNumber: string;

  @Column()
  language: string;

  @Column()
  botID: string;

  @Column()
  button_response: string;
}

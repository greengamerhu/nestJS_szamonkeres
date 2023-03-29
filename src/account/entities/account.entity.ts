import { Owner } from "src/owner/entities/owner.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    accountNumber: string
    @Column()
    balance: number 
    @ManyToOne(type =>Owner, owner => owner.accounts, {onDelete : "CASCADE"})
    owner : Owner
}

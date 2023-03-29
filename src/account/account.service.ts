import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(private dataSource : DataSource) {

  }
  async create(createAccountDto: CreateAccountDto) {
    const accountRepo = this.dataSource.getRepository(Account)
    const newAccount = new Account()
    newAccount.accountNumber = createAccountDto.accountNumber
    newAccount.balance = createAccountDto.balance
    await accountRepo.save(newAccount)
  }

  async findAll() {
    return await  this.dataSource.getRepository(Account).find()
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const accountRepo = this.dataSource.getRepository(Account)
    const accountToUpdate = await accountRepo.findOneBy({id})

    if(!accountToUpdate) {
      throw new BadRequestException("Ilyen id-val nem található Számla")
    }
    if(updateAccountDto.accountNumber == null && updateAccountDto.balance == null) {
      throw new BadRequestException("A kéréshez nem társult semilyen adat")
    }
    accountToUpdate.balance = updateAccountDto.balance
    accountToUpdate.accountNumber = updateAccountDto.accountNumber

    accountRepo.save(accountToUpdate)
  }

  async remove(id: number) {
    const accountRepo = this.dataSource.getRepository(Account)
    const accountToDelete = await accountRepo.findOneBy({id})
    if(accountToDelete == null) {
      throw new BadRequestException()
    }
    await accountRepo.delete({id: id}) 
  }
}

import { Body, ConflictException, Controller, Get, NotFoundException, Param, Post, Render } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { inflateRaw } from 'zlib';
import { Account } from './account/entities/account.entity';
import { AppService } from './app.service';

interface transferBody {
  amount : number
}
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Post('/transfer/:sourceId/:targetId') 
  async transferMoney(@Param('sourceId') sourceId : number, @Param('targetId') targetId: number, @Body() money : transferBody) {
    const accountRepo = this.dataSource.getRepository(Account)
    console.log(sourceId + " " +  targetId)
    const sourceAccount = await accountRepo.findOneBy({id  : sourceId})
    const targetAccount = await accountRepo.findOneBy({id  : targetId})
    console.log(sourceAccount)
    if(!money.amount ) {
      throw new NotFoundException("nem")
    }
    if(sourceAccount == null || targetAccount == null) {
      throw new NotFoundException();
    }
    let sourceAccountBalance = sourceAccount.balance - money.amount
    console.log(sourceAccountBalance)
    if(sourceAccountBalance < 0 ) {
      throw new ConflictException("Csoró")
    }
    targetAccount.balance += money.amount
    sourceAccount.balance = sourceAccountBalance
    await accountRepo.save(targetAccount)
    await accountRepo.save(sourceAccount)

  }
 
}

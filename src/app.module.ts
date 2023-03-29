import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { OwnerModule } from './owner/owner.module';
import { Account } from './account/entities/account.entity';
import { Owner } from './owner/entities/owner.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'database',
      entities: [
        Account, Owner
      ],
      synchronize: true,
    }),
    AccountModule,
    OwnerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

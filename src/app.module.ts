import { Module } from '@nestjs/common';
import { MessagesController } from './messages/controllers/messages.controller';
import { databaseProviders } from './database.providers';
import { MessagesService } from './messages/services/messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './messages/entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 4041,
      username: 'sendmeapp',
      password: 'sendmeapp2020!',
      database: 'sendmeapp',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Message])
  ],
  controllers: [MessagesController],
  exports:[TypeOrmModule],
  providers: [MessagesService],
})
export class AppModule {}

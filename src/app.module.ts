import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RootController } from 'controllers/root/root.controller';
import { AppService } from 'services/app.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
  })],
  controllers: [RootController],
  providers: [AppService],
})
export class AppModule {}

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BalancesController } from 'controllers/balances/balances.controller';
import { RootController } from 'controllers/root/root.controller';
import { SubstrateService } from 'services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        entities: ['dist/entities'],
        entitiesTs: ['src/entities'],
        inject: [ConfigService],
        baseDir: process.cwd(),
        discovery: {
          warnWhenNoEntities: true, // by default, discovery throws when no entity is processed
          requireEntitiesArray: false, // force usage of class refrences in `entities` instead of paths
          alwaysAnalyseProperties: false, // do not analyse properties when not needed (with ts-morph)
        },
        dbName: 'admin',
        driver: PostgreSqlDriver,
        type: 'postgresql', // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
        // clientUrl: "postgresql://"+configService.get<string>("DB_USER")+'@'+configService.get<string>("DB_ADDR")+':'+configService.get<string>("DB_PORT") // defaults to 'mongodb://localhost:27017' for mongodb driver
      }),
    }),
  ],
  
  controllers: [RootController, BalancesController],
  providers: [SubstrateService],
})
export class AppModule {}

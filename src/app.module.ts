import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        const dataschema = configService.get<string>('DATABASE_SCHEMA', 'public');
        if (!databaseUrl) {
          throw new Error('A variavel de ambiente DATABASE_URL não foi encontrada! ');
        }
        return {
          type: 'postgres',
          url: databaseUrl,
          schema: dataschema,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule 
{}
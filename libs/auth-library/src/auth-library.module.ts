import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthLibraryService } from './auth-library.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from '@app/common/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('database.connectionString'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('jwt.secret'),
          signOptions: {
            expiresIn: configService.get<string>('jwt.expirationTime'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthLibraryService, LocalStrategy, JwtStrategy],
  exports: [AuthLibraryService],
})
export class AuthLibraryModule {}
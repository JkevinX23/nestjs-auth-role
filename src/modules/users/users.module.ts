import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from '../roles.guard';
import { RoleEntity } from '../roles/role.entity';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, RoleEntity])],
  providers: [
    UsersService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

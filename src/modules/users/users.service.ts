import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RoleEntity } from '../roles/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: Repository<RoleEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    user.email = createUserDto.email;

    const role = await this.rolesRepository.findOne({
      where: { key: In(createUserDto.roles) },
    });
    if (!role) {
      throw new HttpException('Role not found', 404);
    }
    user.roles = [role];

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(email: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseServiceAbstract } from 'src/services/base/base.abstract.service';
import { User } from './entities/user.entity';
import { UserRepositoryInterface } from './interfaces/users.interface';
import { UserRolesService } from '@module/user-roles/user-roles.service';

@Injectable()
export class UsersService extends BaseServiceAbstract<User> {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly userRoleService: UserRolesService,
  ) {
    super(userRepository);
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create({
      ...createUserDto,
    });
    return user;
  }
}

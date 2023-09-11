import { UserRepositoryInterface } from '@module/users/interfaces/users.interface';
import { Injectable } from '@nestjs/common';
import { BaseRepositoryAbstract } from './base/base.abstract.repository';
import { User } from '@module/users/entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository
  extends BaseRepositoryAbstract<User>
  implements UserRepositoryInterface
{
  constructor(
    @InjectModel(User.name)
    private readonly userRepository: Model<User>,
  ) {
    super(userRepository);
  }
}

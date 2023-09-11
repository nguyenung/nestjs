import { BaseEntity } from '@module/shared/base/base.entity';
import { BaseServiceInterface } from './base.interface.service';
import { FindAllResponse } from 'src/types/common.type';
import { BaseRepositoryInterface } from '@repositories/base/base.interface.repository';

export abstract class BaseServiceAbstract<T extends BaseEntity>
  implements BaseServiceInterface<T>
{
  constructor(private readonly repository: BaseRepositoryInterface<T>) {}

  async create(createDto: T | any): Promise<T> {
    return await this.repository.create(createDto);
  }

  async update(id: string, updateDto: Partial<T>): Promise<T> {
    return await this.repository.update(id, updateDto);
  }

  async remove(id: string): Promise<boolean> {
    return await this.repository.softDelete(id);
  }

  async findAll(filter?: object, options?: object): FindAllResponse<T> {
    return await this.repository.findAll(filter, options);
  }

  async findOne(id: string): Promise<T> {
    return await this.repository.findOneById(id);
  }
}

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './typings/user';
import { DbCrudService } from './db-crud/db-crud.service';

@Injectable()
export class UsersService {
  users;

  constructor(@InjectModel('van-hack-users') private readonly catModel: Model<IUser>, private dbCrudService: DbCrudService) {
    this.users = [
      {
        userId: 1,
        email: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        email: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        email: 'maria',
        password: 'guess',
      },
    ];
  }

  async create(createUserDto: any): Promise<IUser> {
    return this.dbCrudService.createRecord$(this.catModel, createUserDto);
  }

  async update(query, createUserDto: any): Promise<IUser> {
    return this.dbCrudService.updateOneRecord$(this.catModel, query, {$set: createUserDto});
  }

  async findAll(query): Promise<IUser[]> {
    // return this.catModel.find(query).exec();
    return this.dbCrudService.readRecord$(this.catModel, query);
  }

  async findOne(query: object): Promise<IUser | undefined> {
    const data =  await this.catModel.findOne(query).exec();
    return data && data._doc;
  }
}

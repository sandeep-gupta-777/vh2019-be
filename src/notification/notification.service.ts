import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IJob } from '../typings/job';
import { DbCrudService } from '../db-crud/db-crud.service';
import { Model } from 'mongoose';
import { EventService } from '../client/event.service';

@Injectable()
export class NotificationService {

  users;

  constructor(@InjectModel('van-hack-notifications') private readonly catModel: Model<IJob>, private dbCrudService: DbCrudService) {

  }

  async create(createUserDto: any): Promise<IJob> {
    return this.dbCrudService.createRecord$(this.catModel, createUserDto);
  }

  async update(query, createUserDto: any): Promise<IJob> {
    return this.dbCrudService.updateOneRecord$(this.catModel, query, { $set: createUserDto });
  }

  async findAll(query): Promise<IJob[]> {
    // return this.catModel.find(query).exec();
    return this.dbCrudService.readRecord$(this.catModel, query, {}, { limit: 10000, skip: 0 });
  }

  async findOne(query: object): Promise<IJob | undefined> {
    const data = await this.catModel.findOne(query).exec();
    return data && data._doc;
  }

}

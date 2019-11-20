import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IJob } from '../../typings/job';
import { DbCrudService } from '../../db-crud/db-crud.service';

@Injectable()
export class JobService {
  users;

  constructor(@InjectModel('van-hack-jobs') private readonly catModel: Model<IJob>, private dbCrudService: DbCrudService) {
  }

  async create(createUserDto: any): Promise<IJob> {
    return this.dbCrudService.createRecord$(this.catModel, createUserDto);
  }

  async update(query, createUserDto: any): Promise<IJob> {
    return this.dbCrudService.updateOneRecord$(this.catModel, query, { $set: createUserDto });
  }

  async applyForJob(query, jobId: any, action): Promise<IJob> {
    const pull = {
      interview: jobId,
      offer: jobId,
      apply: jobId,
      reject: jobId,
      hire: jobId,
    };
    delete pull[action];
    return this.dbCrudService.updateOneRecord$(this.catModel, query, { $addToSet: { [action]: jobId }, $pull: pull });
  }

  async findAll(query): Promise<IJob[]> {
    // return this.catModel.find(query).exec();
    return this.dbCrudService.readRecord$(this.catModel, query);
  }

  async findOne(query: object): Promise<IJob | undefined> {
    const data = await this.catModel.findOne(query).exec();
    return data && data._doc;
  }
}

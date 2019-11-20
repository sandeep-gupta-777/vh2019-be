import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IJob } from '../typings/job';

@Injectable()
export class DbCrudService {

  createRecord$(model: Model, data: object): Promise<any> {
    return new Promise((resolve, reject) => {
      const record = new model(data);
      record.save((err: any, doc: any) => {
        if (err) {
          return reject('error');
        }
        resolve(doc);
      });
    });
  };

  readRecord$(model: Model<IJob>, query: object, projection?: any, pagination?: { skip: number, limit: number }): Promise<any[]> {
    if (!projection) {
      projection = {};
    }
    if (!pagination) {
      pagination = { limit: 10, skip: 0 };
    }
    return new Promise((resolve, reject) => {
      model.find(query, projection).lean().skip(pagination.skip).limit(pagination.limit).exec((err: any, doc: any[]) => {
        if (err) {
          reject('error');
        }//this is always connection error, if it reaches here
        resolve(doc);
      });
    });
  };

  updateRecord$(model: Model<IJob>, query: object, updates: { $set: object }, options?: { upsert?: boolean, multi?: boolean }): Promise<any> {
    if (!options) {
      options = { upsert: false };
    }
    return new Promise((resolve, reject) => {
      model.update(query, updates, { multi: false, ...options }, function(err: any, doc: any) {
        if (err) {
          return reject('');
        }
        return resolve(doc.nModified);
      });
    });
  };

  updateOneRecord$(model: Model<IJob>, query: object, updates: { $set?: object, $pull?: object, $addToSet?: { [index: string]: number } }, options?: { upsert: boolean }): Promise<any> {
    if (!options) {
      options = { upsert: false };
    }
    return new Promise((resolve, reject) => {
      model.findOneAndUpdate(query, updates, { multi: false, new: true, ...options }, (err: any, doc: any) => {
        if (err) {
          reject('error');
        }
        return resolve(doc);
      });
    });
  };

  deleteRecord$(model: Model<IJob>, query: object) {
    return new Promise((resolve, reject) => {
      model.remove(query, (err: any, data: any) => {
        if (err) {
          return reject('');
        }
        resolve(data.result.n);
      });
    });
  };

}

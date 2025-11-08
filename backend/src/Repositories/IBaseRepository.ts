import { Model ,FilterQuery } from "mongoose";

export class BaseRepository<T> {
  protected model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }
  async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data)
  }
  async getByFilter(filter: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOne(filter);
  }
}

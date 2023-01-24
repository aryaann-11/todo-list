import { Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Connection } from 'mongoose';
import { FilterQuery } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

export class AbstractRepository<TDocument extends AbstractDocument>
{
  constructor(
    protected readonly model: Model<TDocument>,
    private readonly connection: Connection,
  ) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    console.log(this.model);
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    const savedDocument = await createdDocument.save();
    return savedDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery);
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return await this.model.find(filterQuery);
  }

  async update(
    filterQuery: FilterQuery<TDocument>,
    updateQuery: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(
      filterQuery,
      updateQuery,
      {},
    );

    if (!document) {
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async remove(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOneAndRemove(filterQuery);
    if (!document) {
      throw new NotFoundException('Document not found.');
    }
    return document;
  }
}

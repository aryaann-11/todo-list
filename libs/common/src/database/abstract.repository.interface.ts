import { FilterQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export interface IAbstractRepository<TDocument extends AbstractDocument> {
  create(document: Omit<TDocument, '_id'>): Promise<TDocument>;
  findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument>;
  find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]>;
  update(
    filterQuery: FilterQuery<TDocument>,
    document: TDocument,
  ): Promise<TDocument>;
  remove(filterQuery: FilterQuery<TDocument>): Promise<TDocument>;
}

import { Document, Model } from 'mongoose';

export interface IConnection {}

export interface IConnectionDocument extends IConnection, Document {
  id: string;
}

export interface IConnectionModel extends Model<IConnectionDocument> {}

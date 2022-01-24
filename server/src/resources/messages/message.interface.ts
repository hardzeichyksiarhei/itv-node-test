import { Document, Model } from 'mongoose';

import { IConnection } from '../connections/connection.interface';

export interface IMessage {
  session: IConnection;
  body: string;
}

export interface IMessageDocument extends IMessage, Document {
  id: string;
}

export interface IMessageModel extends Model<IMessageDocument> {}

import { Schema, model, Query, Document } from 'mongoose';

import { IConnectionDocument, IConnectionModel, IConnection } from './connection.interface';
import Message from '../messages/message.schema';

const ConnectionSchema = new Schema<IConnectionDocument, IConnectionModel>(
  {},
  { timestamps: true }
);

ConnectionSchema.pre('deleteOne', { document: true }, async function (next) {
  const connection = this as Query<any, Document<IConnection>> & IConnectionDocument
  await Message.deleteMany({ session: connection.id });
  next();
});

ConnectionSchema.virtual('id').get(function virtualId(this: any) {
  return this._id.toHexString();
});

ConnectionSchema.set('toJSON', { virtuals: true });

const Connection = model<IConnectionDocument, IConnectionModel>('Connection', ConnectionSchema);

export default Connection;

import { Schema, model } from 'mongoose';

import { IConnectionDocument, IConnectionModel } from './connection.interface';

const ConnectionSchema = new Schema<IConnectionDocument, IConnectionModel>(
  {},
  { timestamps: true }
);

ConnectionSchema.virtual('id').get(function virtualId(this: any) {
  return this._id.toHexString();
});

ConnectionSchema.set('toJSON', { virtuals: true })

const Connection = model<IConnectionDocument, IConnectionModel>('Connection', ConnectionSchema);

export default Connection;

import { Schema, model, Types } from 'mongoose';

import { IMessageDocument, IMessageModel } from './message.interface';

const MessageSchema = new Schema<IMessageDocument, IMessageModel>(
  {
    session: { type: Types.ObjectId, ref: 'Connection' },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

MessageSchema.virtual('id').get(function virtualId(this: any) {
  return this._id.toHexString();
});

MessageSchema.set('toJSON', { virtuals: true });

const Message = model<IMessageDocument, IMessageModel>('Message', MessageSchema);

export default Message;

import Message from './message.schema';
import { IMessage } from './message.interface';

export const create = async (message: IMessage) => {
  return new Message(message).save();
};

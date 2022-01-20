import Connection from './connection.schema';
import { IConnection } from './connection.interface';

export const create = async (connection: IConnection) => {
  return new Connection(connection).save();
};

export const deleteById = async (id: string) => {
  return Connection.deleteOne({ id });
};

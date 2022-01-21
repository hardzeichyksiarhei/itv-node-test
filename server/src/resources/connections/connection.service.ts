import Connection from './connection.schema';
import { IConnection } from './connection.interface';

export const create = async (connection: IConnection) => {
  return new Connection(connection).save();
};

export const getById = async (id: string) => {
  return Connection.findOne({ id });
};

export const deleteById = async (id: string) => {
  const connection = await getById(id);
  if (!connection) return null;
  return connection.deleteOne();
};

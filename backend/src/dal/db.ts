import { MongoClient, Db } from 'mongodb';

let dbInstance: Db | null = null;

const connectDB = async () : Promise<Db> =>
{
  if (dbInstance) {
    return dbInstance;
  }

  try {
    const client = await MongoClient.connect(`${process.env.DB_URL}`);
    dbInstance = client.db(`${process.env.DB_NAME}`);
    console.log('Connected to MongoDB');
    return dbInstance;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export {connectDB};

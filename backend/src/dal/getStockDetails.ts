import { connectDB } from './db';
import { stockDetails } from '../types';
import { Collection } from 'mongodb';

// Function to get stock details by symbol from MongoDB
const getStockDetails = async (): Promise<stockDetails[]> => {
  try {
    // Connect to the MongoDB database
    const db = await connectDB();
    const collection: Collection = db.collection('stockDetails'); 

    const documents = await collection.find({}).toArray();
    const stockDetails = documents.map((document) => ({
      symbol: document.symbol,
      companyName: document.companyName,
    }));

    return stockDetails;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error; // Reject the promise with the error
  }
};


export { getStockDetails};

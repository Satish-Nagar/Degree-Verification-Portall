import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient> | null = null;

function initClient() {
  if (!uri) return;

  if (process.env.NODE_ENV === 'development') {
    // Preserve the client promise across module reloads in dev
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
    console.log('Connected to MongoDB development');
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
    console.log('Connected to MongoDB productions');
  }
}

// Initialize only when URI is present; otherwise defer to runtime
if (uri) initClient();

export async function getDb(): Promise<Db> {
  if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local');
  }
  if (!clientPromise) {
    initClient();
    if (!clientPromise) throw new Error('Failed to initialize MongoDB client');
  }
  const client = await clientPromise;
  return client.db('degree_verification');
}

export default clientPromise;


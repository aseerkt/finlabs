// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js

import { __prod__ } from '@/helpers/constants';
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (!MONGO_URI) {
    throw new Error(
      'Please define the MONGO_URI environment variable inside .env.local'
    );
  }
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.set('debug', true);
    cached.promise = mongoose.connect(MONGO_URI, {}).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;

import connectDB from '@/libs/connectDB';
import { NextApiHandler } from 'next';

export default function apiWrapper(apiFn: NextApiHandler): NextApiHandler {
  return async (...args) => {
    try {
      await connectDB();
      return apiFn(...args);
    } catch (err) {
      console.log('ERROR THROWN FROM API WRAPPER');
      console.error(err);
    }
  };
}

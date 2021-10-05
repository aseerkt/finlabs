import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

export function getToken(userId: ObjectId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export function getPayload(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

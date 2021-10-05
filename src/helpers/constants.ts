export const __prod__ = process.env.NODE_ENV === 'production';
export const API_URL = `${
  process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
}/api`;

import { clearTokenCookie } from '@/helpers/cookieHelper';
import { NextApiRequest, NextApiResponse } from 'next';

export default function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    clearTokenCookie(res);
    return res.send('Ok');
  }
}

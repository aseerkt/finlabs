import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import cookie from 'cookie';
import { getPayload, getToken } from '@/helpers/jwtHelper';
import { __prod__ } from '@/helpers/constants';

const COOKIE_NAME = 'fin-auth';

export function setTokenCookie(res: NextApiResponse, userId: ObjectId) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(COOKIE_NAME, getToken(userId), {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict',
      secure: __prod__,
    })
  );
}

export function getUserFromCookie(req: NextApiRequest, strict?: boolean) {
  const token = cookie.parse(req.headers.cookie)[COOKIE_NAME];
  try {
    const payload: any = getPayload(token);
    return payload.userId;
  } catch (err) {
    console.error(err.message);
    if (strict) throw err;
    return null;
  }
}

export function clearTokenCookie(res: NextApiResponse) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(COOKIE_NAME, '', {
      httpOnly: true,
      secure: __prod__,
      expires: new Date(0),
      sameSite: 'strict',
    })
  );
}

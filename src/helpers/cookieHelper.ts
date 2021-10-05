import cookie from 'cookie';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
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
      path: '/',
    })
  );
}

export function getUserFromCookie(
  req: NextApiRequest,
  res: NextApiResponse,
  strict?: boolean
) {
  try {
    const token =
      req?.headers?.cookie && cookie.parse(req.headers.cookie)[COOKIE_NAME];
    if (!token) return null;
    const payload: any = getPayload(token);
    return payload.userId;
  } catch (err) {
    console.error(err.message);
    if (strict) {
      res.status(401);
      throw err;
    }
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

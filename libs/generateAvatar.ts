import crypto from 'crypto';

export default function generateAvatar(email: string) {
  // https://gist.github.com/kitek/1579117
  // http://en.gravatar.com/site/implement/hash/
  const md5hash = crypto
    .createHash('md5')
    .update(email.trim().toLowerCase())
    .digest('hex');

  // http://en.gravatar.com/site/implement/images/
  return `https://www.gravatar.com/avatar/${md5hash}?s=250&d=identicon&r=PG`;
}

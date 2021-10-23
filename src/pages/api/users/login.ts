import { NextApiHandler } from 'next';
import connectDB from '@/libs/connectDB';
import UserModel from '@/models/User';
import { setTokenCookie } from '@/helpers/cookieHelper';

const loginHandler: NextApiHandler = async (req, res) => {
  await connectDB();

  switch (req.method) {
    case 'POST': {
      const { usernameOrEmail, password, isTest } = req.body;

      if (isTest) {
        const testUser = await UserModel.findOne({ username: 'bob' }).lean(
          true
        );
        return res.json({ user: testUser });
      }

      const user = await UserModel.findOne(
        usernameOrEmail?.includes('@')
          ? { email: usernameOrEmail }
          : { username: usernameOrEmail }
      ).select('+password');

      if (!user)
        return res.status(400).json({ error: 'incorrect email or username' });

      const isMatch = await user.verifyPassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: 'incorrect password' });
      }

      setTokenCookie(res, user._id);
      return res.json({ user: { ...user.toJSON(), password: undefined } });
    }
  }
};

export default loginHandler;

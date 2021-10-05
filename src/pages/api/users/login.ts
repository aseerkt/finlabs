import { NextApiHandler } from 'next';
import connectDB from '@/libs/connectDB';
import UserModel from '@/models/User';
import { setTokenCookie } from '@/helpers/cookieHelper';

const loginHandler: NextApiHandler = async (req, res) => {
  await connectDB();

  switch (req.method) {
    case 'POST': {
      const { usernameOrEmail, password } = req.body;

      const user = await UserModel.findOne(
        usernameOrEmail?.includes('@')
          ? { email: usernameOrEmail }
          : { username: usernameOrEmail }
      );

      if (!user)
        return res.status(400).json({ error: 'incorrect email or username' });

      const isMatch = await user.verifyPassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: 'incorrect password' });
      }

      setTokenCookie(res, user._id);
      return res.status(200).json({ user: user.toJSON() });
    }
  }
};

export default loginHandler;

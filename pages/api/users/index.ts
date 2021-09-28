import { NextApiHandler } from 'next';
import connectDB from '@/libs/connectDB';
import generateAvatar from '@/libs/generateAvatar';
import UserModel from '@/models/User';
import { getUserFromCookie, setTokenCookie } from '@/helpers/cookieHelper';

const userHandler: NextApiHandler = async (req, res) => {
  await connectDB();

  switch (req.method) {
    case 'GET': {
      const userId = getUserFromCookie(req);
      const user = await UserModel.findById(userId);

      return res.json({ user: user?.toJSON() });
    }
    case 'POST': {
      const { username, email } = req.body;

      const existingUser = await UserModel.findOne({
        $or: [{ email }, { username }],
      });

      if (existingUser)
        return res
          .status(400)
          .json({ error: 'email or username is already taken' });

      const newUser = await UserModel.create({
        ...req.body,
        avatar: generateAvatar(email),
      });

      await newUser.save();

      setTokenCookie(res, newUser._id);
      return res.status(201).json({ user: newUser.toJSON() });
    }
  }
};

export default userHandler;

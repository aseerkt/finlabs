import { Types } from 'mongoose';
import ProjectModel from '@/models/Project';
import apiWrapper from '@/libs/apiWrapper';
import { getUserFromCookie } from '@/helpers/cookieHelper';
import UserModel from '@/models/User';
import BoardModel from '@/models/Board';

export default apiWrapper(async function (req, res) {
  switch (req.method) {
    case 'GET': {
      const projects = await ProjectModel.aggregate()
        .match({ _id: new Types.ObjectId(req.query.projectId as string) })
        .lookup({
          from: 'columns',
          localField: '_id',
          foreignField: 'projectId',
          as: 'columns',
        })
        .lookup({
          from: 'users',
          localField: 'creator',
          foreignField: '_id',
          as: 'creator',
        })
        .unwind('creator')
        .project({ 'creator.password': 0 });

      const boards = await BoardModel.aggregate()
        .match({
          projectId: new Types.ObjectId(req.query.projectId as string),
        })
        .lookup({
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author',
        })
        .unwind('author')
        .project({ 'author.password': 0 });

      if (!projects.length) {
        return res.status(404).json({ error: 'Project not found' });
      }

      return res.json({ project: { ...projects[0], boards } });
    }

    case 'PUT':
      const userId = getUserFromCookie(req, res, true);

      const { acknowledged } = await ProjectModel.updateOne(
        {
          _id: req.query.projectId,
          creator: userId,
        },
        { $set: req.body.project },
        { lean: true }
      );

      return res.status(acknowledged ? 200 : 400).json({ ok: acknowledged });

    case 'DELETE':
      const { deletedCount } = await ProjectModel.deleteOne({
        _id: req.query.projectId,
        creator: userId,
      });

      return res.status(deletedCount ? 200 : 400).json({ ok: deletedCount });
  }
});

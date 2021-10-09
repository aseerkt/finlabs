import { Types } from 'mongoose';
import ProjectModel from '@/models/Project';
import apiWrapper from '@/libs/apiWrapper';
import { getUserFromCookie } from '@/helpers/cookieHelper';

export default apiWrapper(async function (req, res) {
  switch (req.method) {
    case 'GET': {
      const project = await ProjectModel.aggregate()
        .match({ _id: new Types.ObjectId(req.query.projectId as string) })
        .lookup({
          from: 'columns',
          localField: '_id',
          foreignField: 'projectId',
          as: 'columns',
        })
        .lookup({
          from: 'boards',
          localField: '_id',
          foreignField: 'projectId',
          as: 'boards',
        });

      if (!project.length) {
        return res.status(404).json({ error: 'Project not found' });
      }

      await ProjectModel.populate(project, { path: 'boards.author creator' });

      return res.json({ project: project[0] });
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

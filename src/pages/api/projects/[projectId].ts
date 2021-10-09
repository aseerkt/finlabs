import { Types } from 'mongoose';
import ProjectModel from '@/models/Project';
import apiWrapper from '@/libs/apiWrapper';

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
  }
});

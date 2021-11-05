import { getUserFromCookie } from '@/helpers/cookieHelper';
import apiWrapper from '@/libs/apiWrapper';
import BoardModel from '@/models/Board';
import ProjectModel, { Project } from '@/models/Project';
import { Types } from 'mongoose';
import ColumnModel from '@/models/Column';

export default apiWrapper(async (req, res) => {
  const userId = getUserFromCookie(req, res, true);
  switch (req.method) {
    case 'DELETE': {
      const projects = await ProjectModel.aggregate()
        .match({ _id: new Types.ObjectId(req.query.projectId as string) })
        .lookup({
          from: 'columns',
          localField: '_id',
          foreignField: 'projectId',
          as: 'columns',
        });

      const project: Project = projects[0];
      const projectOwnerId = project.creator.toString();

      if (projectOwnerId === userId) {
        const boardIds = project.columns.find(
          (col) => col._id == req.query.columnId
        );
        await ColumnModel.updateOne(
          { _id: req.query.columnId, projectId: req.query.projectId },
          { $set: { boards: [] } }
        );
        await BoardModel.deleteMany({ _id: { $in: boardIds } });
        return res.json({ ok: true });
      } else {
        return res.status(403).json({
          error:
            'You are not authorized to delete column cards for this project',
        });
      }
    }
  }
});

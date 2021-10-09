import { getUserFromCookie } from '@/helpers/cookieHelper';
import apiWrapper from '@/libs/apiWrapper';
import BoardModel from '@/models/Board';
import ProjectModel from '@/models/Project';

export default apiWrapper(async (req, res) => {
  const userId = getUserFromCookie(req, res, true);
  switch (req.method) {
    case 'DELETE': {
      const project = await ProjectModel.findById(req.query.projectId);

      if (project?.creator.toString() === userId) {
        await BoardModel.deleteMany({
          columnId: req.query.columnId,
          projectId: req.query.projectId,
        });
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

import { getUserFromCookie } from '@/helpers/cookieHelper';
import apiWrapper from '@/libs/apiWrapper';
import BoardModel from '@/models/Board';
import ColumnModel from '@/models/Column';
import ProjectModel from '@/models/Project';
import ColumnId from 'pages/api/projects/[projectId]/columns/[columnId]';

export default apiWrapper(async (req, res) => {
  const userId = getUserFromCookie(req, res, true);
  switch (req.method) {
    case 'POST': {
      const board = await BoardModel.create({
        ...req.body.board,
        projectId: req.query.projectId,
        author: userId,
      });

      await board.populate('author');
      return res.status(201).json({ board: board.toJSON() });
    }
  }
});

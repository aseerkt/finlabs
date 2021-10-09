import { getUserFromCookie } from '@/helpers/cookieHelper';
import apiWrapper from '@/libs/apiWrapper';
import BoardModel from '@/models/Board';
import ColumnModel from '@/models/Column';

export default apiWrapper(async (req, res) => {
  const { projectId, boardId } = req.query;
  const userId = getUserFromCookie(req, res, true);

  switch (req.method) {
    case 'PUT': {
      const boardEditResult = await BoardModel.updateOne(
        {
          where: { project: projectId, _id: boardId, author: userId },
        },
        { $set: req.body.board },
        { lean: true }
      );
      if (!boardEditResult.acknowledged) {
        // check if column is changed
        return res.status(400).json({ error: 'board update failed' });
      }
      return res.json({ board: req.body.board });
    }
    case 'DELETE': {
      const boardDeleteResult = await BoardModel.deleteOne({
        _id: boardId,
        projectId,
        author: userId,
      });

      if (!boardDeleteResult.deletedCount) {
        return res.status(400).json({ error: 'Delete board failed' });
      }

      return res.json({ ok: true });
    }
  }
});

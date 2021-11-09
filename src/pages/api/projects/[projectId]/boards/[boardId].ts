import { Types } from 'mongoose';
import { getUserFromCookie } from '@/helpers/cookieHelper';
import apiWrapper from '@/libs/apiWrapper';
import BoardModel, { IBoard } from '@/models/Board';
import ColumnModel from '@/models/Column';

export default apiWrapper(async (req, res) => {
  const { projectId, boardId } = req.query;
  const userId = getUserFromCookie(req, res, true);

  switch (req.method) {
    case 'PUT': {
      const boardToEdit: Partial<IBoard> = {
        title: req.body.board.title,
        description: req.body.board.description,
      };
      const editedBoard = await BoardModel.findOneAndUpdate(
        { projectId, _id: boardId, author: userId },
        { $set: boardToEdit },
        { lean: true }
      );
      if (!editedBoard) {
        // check if column is changed
        return res.status(400).json({ error: 'board update failed' });
      }
      return res.json({ board: editedBoard });
    }
    case 'DELETE': {
      const boardDeleteResult = await BoardModel.deleteOne({
        _id: boardId,
        projectId,
        author: userId,
      });

      const columnUpdateResult = await ColumnModel.updateOne(
        {
          boards: boardId,
          projectId,
        },
        { $pull: { boards: new Types.ObjectId(boardId as string) } }
      );

      if (
        !boardDeleteResult.deletedCount ||
        !columnUpdateResult.modifiedCount
      ) {
        return res.status(400).json({ error: 'Delete board failed' });
      }

      return res.json({ ok: true });
    }
  }
});

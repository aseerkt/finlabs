import { getUserFromCookie } from '@/helpers/cookieHelper';
import apiWrapper from '@/libs/apiWrapper';
import BoardModel from '@/models/Board';
import ColumnModel from '@/models/Column';
<<<<<<< HEAD
=======
import { Types } from 'mongoose';
>>>>>>> 83ffb53 (feat: drag n drop (#2))

export default apiWrapper(async (req, res) => {
  const userId = getUserFromCookie(req, res, true);
  switch (req.method) {
    case 'POST': {
      const { columnId, boardData } = req.body;
      const board = await BoardModel.create({
        ...boardData,
        projectId: req.query.projectId,
        author: userId,
      });
<<<<<<< HEAD
      const column = await ColumnModel.findOne({
        _id: columnId,
=======
      console.log(columnId);
      const column = await ColumnModel.findOne({
        _id: new Types.ObjectId(columnId),
        projectId: req.query.projectId,
>>>>>>> 83ffb53 (feat: drag n drop (#2))
      });

      column.boards.unshift(board._id);
      await column.save();

      await board.populate('author');
      return res.status(201).json({ board: board.toJSON() });
    }
  }
});

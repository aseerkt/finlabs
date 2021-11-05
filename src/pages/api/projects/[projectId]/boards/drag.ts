import { getUserFromCookie } from '@/helpers/cookieHelper';
import apiWrapper from '@/libs/apiWrapper';
import BoardModel from '@/models/Board';
import ColumnModel from '@/models/Column';
import { isEqual } from 'lodash';
import { Types } from 'mongoose';
import { DropResult } from 'react-beautiful-dnd';

export default apiWrapper(async (req, res) => {
  const userId = getUserFromCookie(req, res, true);
  const { draggableId, source, destination } = req.body as DropResult;
  switch (req.method) {
    case 'POST': {
      const board = await BoardModel.findOne({
        _id: new Types.ObjectId(draggableId),
        projectId: req.query.projectId,
        author: userId,
      });
      if (!board) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      if (isEqual(source, destination) || !destination) {
        return res.status(400).json({ error: 'board not dragged' });
      }

      await ColumnModel.updateOne(
        { _id: source.droppableId },
        { $pull: { boards: new Types.ObjectId(draggableId) } }
      );

      await ColumnModel.updateOne(
        { _id: destination.droppableId },
        {
          $push: {
            boards: { $each: [draggableId], $position: destination.index },
          },
        }
      );
      return res.json({ ok: true });
    }
  }
});

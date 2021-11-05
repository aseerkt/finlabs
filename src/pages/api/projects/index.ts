import BoardModel from '@/models/Board';
import ProjectModel from '@/models/Project';
import ColumnModel from '@/models/Column';
import { getUserFromCookie } from '@/helpers/cookieHelper';
import apiWrapper from '@/libs/apiWrapper';

export default apiWrapper(async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const projects = await ProjectModel.aggregate()
        .lookup({
          from: 'boards',
          as: 'boards',
          localField: '_id',
          foreignField: 'projectId',
        })
        .lookup({
          from: 'users',
          localField: 'creator',
          foreignField: '_id',
          as: 'creator',
        })
        .unwind('creator')
        .project({ 'creator.password': 0 });

      return res.json({ projects });
    }
    case 'POST': {
      const userId = getUserFromCookie(req, res, true);
      const { name, description } = req.body;

      // check if a project already exists with the same name
      const existingProject = await ProjectModel.findOne({
        name,
        creator: userId,
      }).lean();

      if (existingProject) {
        return res
          .status(400)
          .json({ error: `project name ${name} is already taken` });
      }

      const project = await ProjectModel.create({
        name,
        description,
        creator: userId,
      });

      const boards = await BoardModel.create([
        {
          title: `tasks for ${name}`,
          description: 'this is a test board',
          projectId: project._id,
          author: userId,
        },
      ]);

      const columns = await ColumnModel.create([
        { title: 'todo', projectId: project._id, boards },
        { title: 'in progress', projectId: project._id },
        { title: 'completed', projectId: project._id },
      ]);

      project.columns = columns;
      await project.save();

      return res.status(201).json({
        project: project.toJSON(),
      });
    }
  }
});

import { getUserFromCookie } from '@/helpers/cookieHelper';
import apiWrapper from '@/libs/apiWrapper';
import BoardModel, { LabelsEnum } from '@/models/Board';
import ProjectModel from '@/models/Project';

export default apiWrapper(async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const projects = await ProjectModel.find()
        .populate('creator')
        .select('-creator.password');
      return res.json({ projects: projects.map((p) => p.toJSON()) });
    }
    case 'POST': {
      const userId = getUserFromCookie(req, res, true);
      const { name, description } = req.body;

      // check if a project already exists with the same name
      const existingProject = await ProjectModel.findOne({
        name,
        creator: userId,
      });

      if (existingProject) {
        return res
          .status(400)
          .json({ error: `project name ${name} is already taken` });
      }

      const testBoard = new BoardModel({
        title: 'test board',
        description: 'this is a test board',
        label: LabelsEnum.question,
      });

      await testBoard.save();

      const newProject = new ProjectModel({
        name,
        description,
        creator: userId,
        boards: [testBoard],
      });

      await newProject.save();

      return res.status(201).json({ project: newProject.toJSON() });
    }
  }
});

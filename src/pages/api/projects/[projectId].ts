import apiWrapper from '@/libs/apiWrapper';
import ProjectModel from '@/models/Project';

export default apiWrapper(async function (req, res) {
  switch (req.method) {
    case 'GET': {
      const project = await ProjectModel.findOne({
        _id: req.query.projectId,
      })
        .populate('creator boards')
        .select('-creator.password');

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      return res.json({ project: project.toJSON() });
    }
  }
});

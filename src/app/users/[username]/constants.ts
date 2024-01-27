export const tabRoutes = [
  {
    id: 'overview',
    name: 'Overview',
    pathRegex: /^\/users\/[^/]+$/,
    subPath: '/',
  },
  {
    id: 'projects',
    name: 'Projects',
    pathRegex: /^\/users\/[^/]+\/projects$/,
    subPath: '/projects',
  },
  {
    id: 'followers',
    name: 'Followers',
    pathRegex: /^\/users\/[^/]+\/followers$/,
    subPath: '/followers',
  },
  {
    id: 'followings',
    name: 'Followings',
    pathRegex: /^\/users\/[^/]+\/followings$/,
    subPath: '/followers',
  },
  {
    id: 'stars',
    name: 'Stars',
    pathRegex: /^\/users\/[^/]+\/stars$/,
    subPath: '/followers',
  },
];

export const tabPathMap = tabRoutes.reduce((prev, curr) => ({
  ...prev,
  [curr.id]: curr.subPath,
}));

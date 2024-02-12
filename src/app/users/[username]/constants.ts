interface TabRoute {
  name: string;
  pathRegex: RegExp;
  subPath: string;
}

export const tabRoutes: TabRoute[] = [
  {
    name: 'Overview',
    pathRegex: /^\/users\/[^/]+$/,
    subPath: '/',
  },
  {
    name: 'Projects',
    pathRegex: /^\/users\/[^/]+\/projects$/,
    subPath: '/projects',
  },
  {
    name: 'Followers',
    pathRegex: /^\/users\/[^/]+\/followers$/,
    subPath: '/followers',
  },
  {
    name: 'Followings',
    pathRegex: /^\/users\/[^/]+\/followings$/,
    subPath: '/followings',
  },
  // {
  //   id: 'stars',
  //   name: 'Stars',
  //   pathRegex: /^\/users\/[^/]+\/stars$/,
  //   subPath: '/followers',
  // },
];

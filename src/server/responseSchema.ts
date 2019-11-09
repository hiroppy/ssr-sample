import raw from 'raw.macro';

export type Samples = typeof apolloSamples;

// export type Themes = {
//   [key in 'dark' | 'light']: {
//     main: string;
//     sub: string;
//   };
// };

// TODO: fix
// need to create babel-plugin

export const sagaSamples = [
  {
    id: 1,
    code: process.env.NODE_ENV !== 'test' ? raw('../client/sagas/pages.ts') : 'test-code',
    name: 'pages.tsx',
    likeCount: 0,
    description: 'aaaa'
  },
  {
    id: 2,
    code: process.env.NODE_ENV !== 'test' ? raw('../client/sagas/pages.ts') : 'test-code',
    name: 'pages.tsx',
    likeCount: 0,
    description: 'aaaa'
  },
  {
    id: 3,
    code: process.env.NODE_ENV !== 'test' ? raw('../client/sagas/pages.ts') : 'test-code',
    name: 'pages.tsx',
    likeCount: 0,
    description: 'aaaa'
  },
  {
    id: 4,
    code: process.env.NODE_ENV !== 'test' ? raw('../client/sagas/pages.ts') : 'test-code',
    name: 'pages.tsx',
    likeCount: 0,
    description: 'aaaa'
  }
];

export const apolloSamples = [
  {
    id: 1,
    code:
      process.env.NODE_ENV !== 'test'
        ? raw('../client/components/pages/Apollo/Apollo.tsx')
        : 'test-code',
    name: 'apollo.tsx',
    likeCount: 0,
    description: 'aaaa'
  },
  {
    id: 2,
    code:
      process.env.NODE_ENV !== 'test'
        ? raw('../client/components/pages/Apollo/Apollo.tsx')
        : 'test-code',
    name: 'apollo.tsx',
    likeCount: 0,
    description: 'aaaa'
  },
  {
    id: 3,
    code:
      process.env.NODE_ENV !== 'test'
        ? raw('../client/components/pages/Apollo/Apollo.tsx')
        : 'test-code',
    name: 'apollo.tsx',
    likeCount: 0,
    description: 'aaaa'
  },
  {
    id: 4,
    code:
      process.env.NODE_ENV !== 'test'
        ? raw('../client/components/pages/Apollo/Apollo.tsx')
        : 'test-code',
    name: 'apollo.tsx',
    likeCount: 0,
    description: 'aaaa'
  }
];

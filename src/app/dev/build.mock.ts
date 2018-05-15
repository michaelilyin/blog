import casual from 'casual-browserify/src/casual_browserify.js';

export const BUILD_SCHEMA = `
  type Build {
    date: DateTime!
    commit: String!
    version: String!
  }
  
  extend type Query {
    build: Build!
  }
`;

export const BUILD_MOCK = {
  Build: () => ({
    commit: () => casual.uuid,
    version: () => `${casual.integer(0)}.${casual.integer(0)}.${casual.integer(0)}`
  })
};

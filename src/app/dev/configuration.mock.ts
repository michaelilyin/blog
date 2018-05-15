import casual from 'casual-browserify/src/casual_browserify.js';

export const CONFIGURATION_SCHEMA = `
  type Configuration {
    name: String!
  }
  
  extend type Query {
    configuration: Configuration!
  }
`;

export const CONFIGURATION_MOCK = {
  Configuration: () => ({
    name: () => casual.title
  })
};

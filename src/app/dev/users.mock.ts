import casual from 'casual-browserify/src/casual_browserify.js';

export const USERS_SCHEMA = `
  type User {
    username: String!
    firstName: String!
    lastName: String
    email: String!
  }
  
  extend type Query {
    users: [User!]!
  }
`;

export const USERS_MOCK = {
  User: () => ({
    username: () => casual.username,
    firstName: () => casual.first_name,
    lastName: () => casual.last_name,
    email: () => casual.email
  })
};

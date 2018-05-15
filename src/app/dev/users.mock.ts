import casual from 'casual-browserify/src/casual_browserify.js';

export const USERS_SCHEMA = `
  type User {
    login: String!
    firstname: String!
    lastname: String
    email: String!
  }
  
  extend type Query {
    users: [User!]!
  }
`;

export const USERS_MOCK = {
  User: () => ({
    login: () => casual.username,
    firstname: () => casual.first_name,
    lastname: () => casual.last_name,
    email: () => casual.email
  })
};

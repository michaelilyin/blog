import casual from 'casual-browserify/src/casual_browserify.js';
import {MockList} from 'graphql-tools';

export const USERS_SCHEMA = `
  type User {
    username: String!
    firstName: String!
    lastName: String
    email: String!
  }
  
  type UserPage implements Page {
    total: Int!
    items: [User!]!
  }
  
  extend type Query {
    users(req: PageRequest!): UserPage!
  }
`;

export const USERS_MOCK = {
  User: () => ({
    username: () => casual.username,
    firstName: () => casual.first_name,
    lastName: () => casual.last_name,
    email: () => casual.email
  }),
  UserPage: (_, vars) => {
    const req = vars.req;
    const total = req.offset + casual.integer(0, req.limit * 2);
    const left = total - req.offset;
    const current = left < req.limit ? left : req.limit;
    return {
      items: () => new MockList(current),
      total: total
    }
  }
};

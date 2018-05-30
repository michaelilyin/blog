import {list} from '@app/dev/mock.utils';
import {casual} from '@app/dev/casual.util';

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
  UserPage: list()
};

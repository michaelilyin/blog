import casual from 'casual-browserify/src/casual_browserify.js';

export const LOG_SCHEMA = `
  type ClientLogRecord {
    id: ID!
    message: String!
  }
  
  input ClientLogRecordCreate {
    message: String!
  }
  
  extend type Query {
    clientLogs: [ClientLogRecord!]!
  }
  
  extend type Mutation {
    createClientLogRecord(log: ClientLogRecordCreate!): ClientLogRecord!
  }
`;

export const LOG_MOCK = {
  ClientLogRecord: () => ({
    message: () => casual.sentence
  })
};

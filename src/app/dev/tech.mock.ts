import {MockList} from 'graphql-tools';
import {list} from '@app/dev/mock.utils';
import {casual} from '@app/dev/casual.util';

export const TECH_SCHEMA = `
  type Project {
    id: ID!
    title: String!
    description: String!
    begin: DateTime!
    end: DateTime
    nda: Boolean!
  }
  
  type TechType {
    id: ID!
    title: String!
    color: Color!
  }

  type Tech {
    id: ID!
    title: String!
    description: String
    type: TechType!
    specs: [TechSpec!]!
  }
  
  type TechSpec {
    id: ID!
    title: String!
    description: String
    tech: Tech! 
    notes: [UsageNote!]
  }
  
  type TechUsage {
    spec: TechSpec!
    project: Project!
    begin: DateTime!
    end: DateTime
    notes: [UsageNote!]
  }
  
  type UsageNote {
    id: ID!
    description: String!
    note: String!
    format: String!
    spec: TechSpec!
    date: DateTime!
  }
  
  type Experience {
    spec: TechSpec!
    days: Int!
  }
  
  type TechPage implements Page {
    total: Int!
    items: [Tech!]!
  }
  
  type ProjectPage implements Page {
    total: Int!
    items: [Project!]!
  }
  
  extend type Query {
    tech(id: ID!): Tech!
    project(id: ID!): Project!
    
    topExperience(count: Int!): [Experience]!
    
    recentUsageNotes(count: Int!): [UsageNote]!
    
    lastUsages(count: Int!): [TechUsage]!
  }
`;

export const TECH_MOCK = {
  TechPage: list(),

  TechSpec: () => ({
    title: () => casual.title,
    description: () => casual.populate_one_of([casual.description, null])
  }),

  TechUsage: () => ({

  }),

  Tech: () => ({
    title: () => casual.title,
    description: () => casual.populate_one_of([casual.description, null])
  }),

  Experience: () => ({
    days: () => casual.integer(10, 1000)
  }),

  UsageNote: () => ({
    description: () => casual.text.substring(0, 256),
    note: () => casual.text,
    format: () => 'text'
  })
};

export const TECH_QUERY_EXT = {
  topExperience: (_, vars) => {
    const count = vars.count;
    return new MockList([0, count]);
  },
  recentUsageNotes: (_, vars) => {
    const count = vars.count;
    return new MockList([0, count]);
  },
  lastUsages: (_, vars) => {
    const count = vars.count;
    return new MockList([0, count]);
  }
};

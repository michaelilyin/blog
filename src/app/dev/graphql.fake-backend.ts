import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {MockList, mockServer} from 'graphql-tools';
import {delay, dematerialize, map, materialize, tap} from 'rxjs/operators';
import {from} from 'rxjs';
import {ExecutionResult} from 'graphql';
import {CONFIGURATION_MOCK, CONFIGURATION_SCHEMA} from '@app/dev/configuration.mock';
import casual from 'casual-browserify/src/casual_browserify.js';
import {BUILD_MOCK, BUILD_SCHEMA} from '@app/dev/build.mock';
import {USERS_MOCK, USERS_SCHEMA} from '@app/dev/users.mock';
import {LOG_MOCK, LOG_SCHEMA} from '@app/dev/log.mock';
import {TECH_MOCK, TECH_QUERY_EXT, TECH_SCHEMA} from '@app/dev/tech.mock';

const schema = `
  scalar DateTime
  scalar Date
  scalar Color
  scalar Object
  
  input PageRequest {
    offset: Int!
    limit: Int!
  }
  
  interface Page {
    total: Int!
  }
  
  type Query {
    health: String!
  }
  
  type Mutation {
    health(req: String!): String!
  }
  
  ${CONFIGURATION_SCHEMA}
  ${BUILD_SCHEMA}
  ${USERS_SCHEMA}
  ${LOG_SCHEMA}
  ${TECH_SCHEMA}
  
  schema {
    query: Query
    mutation: Mutation
  }
`;

const server = mockServer(schema, {
  ...CONFIGURATION_MOCK,
  ...BUILD_MOCK,
  ...USERS_MOCK,
  ...LOG_MOCK,
  ...TECH_MOCK,

  DateTime: () => casual.moment.toISOString(),
  Date: () => casual.moment.toISOString().substring(0, 10),

  Query: () => ({
    health: () => 'OK',

    ...TECH_QUERY_EXT
  })
});

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.endsWith('graphql')) {
      const result = server.query(request.body.query, request.body.variables);
      return from(result)
        .pipe(
          tap(res => {
            console.info('Mock server produced result:\n', res);
          }),
          map(res => {
            return new HttpResponse<ExecutionResult>({
              status: 200,
              body: res
            })
          }),
          materialize(),
          delay(250),
          dematerialize()
        );
    }
    return next.handle(request);
  }
}


export const FakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};

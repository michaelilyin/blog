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
import {CONFIGURATION_MOCK, CONFIGURATION_SCHEMA} from './configuration.mock';
import casual from 'casual-browserify/src/casual_browserify.js';
import {BUILD_MOCK, BUILD_SCHEMA} from './build.mock';
import {USERS_MOCK, USERS_SCHEMA} from './users.mock';

const schema = `
  scalar DateTime
  
  type Query {
    health: String
  }
  
  ${CONFIGURATION_SCHEMA}
  ${BUILD_SCHEMA}
  ${USERS_SCHEMA}
  
  schema {
    query: Query
  }
`;

const server = mockServer(schema, {
  ...CONFIGURATION_MOCK,
  ...BUILD_MOCK,
  ...USERS_MOCK,

  DateTime: () => casual.moment.toISOString(),

  Query: () => ({
    health: () => 'OK',
    users: () => new MockList(20)
  })
});

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.endsWith('graphql')) {
      const result = server.query(request.body.query);
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
          delay(25),
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

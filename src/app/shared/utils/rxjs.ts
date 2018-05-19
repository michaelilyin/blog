import {filter} from 'rxjs/operators';
import {MonoTypeOperatorFunction} from 'rxjs/src/internal/types';
import {OperatorFunction} from 'rxjs/interfaces';
import {Subscription} from 'rxjs/Subscription';

export const defined = (a) => a !== null && a !== undefined;

export function unsubscribe(sub: Subscription) {
  if (defined(sub)) {
    sub.unsubscribe();
  }
}

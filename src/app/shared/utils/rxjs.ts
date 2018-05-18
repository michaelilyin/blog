import {filter} from 'rxjs/operators';
import {MonoTypeOperatorFunction} from 'rxjs/src/internal/types';
import {OperatorFunction} from 'rxjs/interfaces';

export const defined = (a) => a !== null && a !== undefined;

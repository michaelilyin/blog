import {CollectionViewer} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {Keyable} from '../../keyable';
import {PageEvent} from '@angular/material';
import {ReplaySubject} from 'rxjs/ReplaySubject';

export class PageData<T> {
    constructor(public readonly values: T[],
                public readonly total: number) {

    }
}

export class PageRequest {
    constructor(public readonly page: number = 0,
                public readonly size: number = 10) {

    }
}

export abstract class PageSupportService<T> {
    public abstract readonly values: ReplaySubject<PageData<Keyable<T>>>;
    abstract refresh(request: PageRequest);
}

export abstract class PageSupportDataSource<T> {
    public length = 0;
    public event = new PageRequest(0, 10);

    constructor(private tableService: PageSupportService<T>) {
    }

    connect(collectionViewer: CollectionViewer): Observable<Keyable<T>[]> {
        return this.tableService.values
            .map(page => {
                this.length = page.total;
                return page.values
            });
    }

    disconnect(collectionViewer: CollectionViewer): void {

    }

    refresh(event?: PageEvent) {
        if (event) {
            this.event = new PageRequest(event.pageIndex, event.pageSize);
        }
        this.tableService.refresh(this.event);
    }
}

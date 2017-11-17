import {MatPaginatorIntl} from '@angular/material';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LogService} from 'ngx-log';

@Injectable()
export class PaginatorTranslator implements MatPaginatorIntl {

    changes: Subject<void> = new Subject<any>();
    itemsPerPageLabel: string;
    nextPageLabel: string;
    previousPageLabel: string;
    getRangeLabel: (page: number, pageSize: number, length: number) => string;

    constructor(private readonly translateService: TranslateService,
                private readonly logger: LogService) {
        this.logger.log('Paginator translator created');
        this.setValues();
        this.translateService.onLangChange.subscribe(() => this.setValues());
    }

    private setValues() {
        this.logger.log('Paginator translator change labels');
        this.itemsPerPageLabel = this.translateService.instant('COMMON.PAGINATOR.ITEMS-PER-PAGE');
        this.nextPageLabel = this.translateService.instant('COMMON.PAGINATOR.NEXT');
        this.previousPageLabel = this.translateService.instant('COMMON.PAGINATOR.PREV');
        this.getRangeLabel = (page, size, length) => {
            const from = page * size;
            const to = from + size;
            return this.translateService.instant('COMMON.PAGINATOR.RANGE', {
                from: from + 1,
                to: to < length ? to : length,
                size: length
            });
        };
        this.changes.next()
    }

}

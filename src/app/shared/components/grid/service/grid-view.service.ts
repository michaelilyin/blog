import {Injectable, Provider} from '@angular/core';
import {Field, FieldType} from '@app-shared/metamodel/model/metamodel.model';
import {GridColumn} from '@app-components/grid/model/grid-column.model';
import {GridColumnView, ViewType} from '@app-components/grid/model/grid-column-view.model';
import {NGXLogger} from 'ngx-logger';

@Injectable()
export class GridViewService {

  constructor(private logger: NGXLogger) {
  }

  columnModelToView(meta: Field[], column: GridColumn[]): GridColumnView[] {
    this.logger.debug('Convert model to grid view columns');
    const columnSet = new Map<string, GridColumn>();
    if (column) {
      column.forEach(col => columnSet.set(col.key, col));
    }
    return meta.map(field => {
      const def = columnSet.get(field.key);
      const res: GridColumnView = {
        key: field.key,
        name: field.name,
        type: this.toViewType(field.type),
        displayed: def && def.displayByDefault
      };
      return res;
    });
  }

  private toViewType(type: FieldType): ViewType {
    switch (type) {
      case FieldType.ID:
        return ViewType.ID;
      case FieldType.STRING:
        return ViewType.STRING;
    }
  }
}

export const GridViewServiceProvider: Provider = {
  provide: GridViewService,
  useClass: GridViewService
};

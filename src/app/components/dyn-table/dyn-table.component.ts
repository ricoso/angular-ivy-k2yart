import {
    AfterContentInit, Component, ContentChild,
    ContentChildren, EventEmitter, Input,
    OnChanges, OnInit, ViewChildren,
    Output, QueryList, ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable, MatSortHeader } from '@angular/material/sort';
import { MatColumnDef, MatHeaderRowDef, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { DynColumnComponent } from './dyn-column.component';

@Component({
  selector: 'app-dyn-table',
  templateUrl: './dyn-table.component.html'
})
export class DynTableComponent<T> implements OnChanges, AfterContentInit {

  @ContentChildren(DynColumnComponent) dynColumns: QueryList<DynColumnComponent<T>>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;

  @ContentChild(MatHeaderRowDef, { static: true }) headerRowDef: MatHeaderRowDef;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<T>>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ContentChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild(MatTable, { static: true }) table: MatTable<T>;

  @Input() displayedColumns: any;
  @Input() data: any;

  public dataSource = new MatTableDataSource([]);

  constructor() { }

  ngOnChanges() {
    if (this.data) {
      this.setData(this.data);
    }
  }

  ngAfterContentInit() {
    console.log(':::', this.dynColumns);
    console.log(':::', this.columnDefs);
    console.log(':::', this.table);
    console.log(':::', this.sort);
    this.dynColumns.forEach(dynColumn => this.table.addColumnDef(dynColumn.columnDef));
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));

    // this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    // this.table.addHeaderRowDef(this.headerRowDef);
  }

  setData(data) {
    if (Array.isArray(data)) {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

}

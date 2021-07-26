import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Component, Input, OnDestroy, OnInit, Optional, ViewChild, ContentChild, TemplateRef} from '@angular/core';
import { MatSortHeader } from '@angular/material/sort';
import { MatColumnDef, MatTable } from '@angular/material/table';


/**
 * Column that shows simply shows text content for the header and row
 * cells. By default, the name of this column will be assumed to be both the header
 * text and data property used to access the data value to show in cells. To override
 * the header text, provide a label text. To override the data cell values,
 * provide a dataAccessor function that provides the string to display for each row's cell.
 */
@Component({
    selector: 'app-dyn-column',
    template: `
    <ng-container matColumnDef>
        <th mat-header-cell *matHeaderCellDef mat-sort-header> {{ label }} </th>
        <td mat-cell *matCellDef="let data">
            {{ getData(data) }}
        </td>
    </ng-container>`
})
export class DynColumnComponent<T> implements OnDestroy, OnInit {

    // @ContentChild(TemplateRef) template: TemplateRef<any>;
    // @ContentChild('colContent') colContentTmpl: TemplateRef<any>;

    /** Column name that should be used to reference this column. */
    @Input()
    get name(): string { return this._name; }
    set name(name: string) {
        this._name = name;
        this.columnDef.name = name;
    }
    _name: string;

    /**
     * Text label that should be used for the column header. If this property is not
     * set, the header text will default to the column name.
     */
    @Input() label: string;

    /**
     * Accessor function to retrieve the data should be provided to the cell. If this
     * property is not set, the data cells will assume that the column name is the same
     * as the data property the cells should display.
     */
    @Input() dataAccessor: ((data: T, name: string) => string);

    /** Alignment of the cell values. */
    @Input() align: 'before' | 'after' = 'before';

    /** Whether the column is sortable */
    @Input()
    get sortable(): boolean { return this._sortable; }
    set sortable(sortable: boolean) {
        this._sortable = coerceBooleanProperty(sortable);
    }
    _sortable: boolean;

    @ViewChild(MatColumnDef, { static: true }) columnDef: MatColumnDef;

    @ViewChild(MatSortHeader, { static: false }) sortHeader: MatSortHeader;

    constructor(
        @Optional() public table: MatTable<any>
    ) {}

    ngOnInit() {
        // if no label is set, use name as label
        if (!this.label) {
            this.label = this.capitilize(this.name);
        }

        if (this.table) {
            this.table.addColumnDef(this.columnDef);
        }
    }

    ngOnDestroy() {
        if (this.table) {
            this.table.removeColumnDef(this.columnDef);
        }
    }

    getData(data: T): any {
        return this.dataAccessor ? this.dataAccessor(data, this.name) : (data as any)[this.name];
    }

    capitilize(word: string) {
        word = word.replace(/_/g, ' ');
        return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ngv-gif-pagination',
    templateUrl: './gif-pagination.component.html',
    styleUrls: ['./gif-pagination.component.scss'],
})
export class GifPaginationComponent {
    @Input() page: number;
    @Input() count: number;
    @Input() totalCount: number;

    @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

    constructor() {}

    onPageChange(page: number) {
        this.pageChange.emit(page);
    }
}

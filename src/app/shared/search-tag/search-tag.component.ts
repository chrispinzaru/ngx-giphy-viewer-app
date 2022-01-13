import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'ngv-search-tag',
    templateUrl: './search-tag.component.html',
    styleUrls: ['./search-tag.component.scss'],
})
export class SearchTagComponent {
    @Output() remove: EventEmitter<boolean> = new EventEmitter();

    constructor() {}

    handleClick() {
        this.remove.emit();
    }
}

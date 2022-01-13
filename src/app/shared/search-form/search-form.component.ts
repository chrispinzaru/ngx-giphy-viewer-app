import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'ngv-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
    @Input() set query(searchQuery: string) {
        const rawSearchTags = this.parseQueryTags(searchQuery);
        if (rawSearchTags) {
            this.searchTags = [...rawSearchTags];
        }
    }

    @Output() queryChange: EventEmitter<string> = new EventEmitter<string>();

    public searchForm = new FormGroup({
        query: new FormControl(''),
    });

    public searchTags: string[] = [];

    constructor() {}

    public emitSearchQueryChange() {
        this.queryChange.emit(this.searchTags.join(' '));
    }

    public onSubmit() {
        const query = this.searchForm.value.query;
        const rawSearchTags = this.parseQueryTags(query).filter(
            (tag) => !this.searchTags.includes(tag)
        );

        if (rawSearchTags.length) {
            this.searchTags = [...this.searchTags, ...rawSearchTags];
            this.emitSearchQueryChange();
        }

        this.searchForm.reset();
    }

    public onTagRemove(tag: string) {
        const tagIndex = this.searchTags.indexOf(tag);
        if (tagIndex !== -1) {
            this.searchTags.splice(tagIndex, 1);
            this.emitSearchQueryChange();
        }
    }

    private parseQueryTags(searchQuery: string = ''): string[] {
        return searchQuery.split(' ').filter((tag: string) => tag.length > 0);
    }
}

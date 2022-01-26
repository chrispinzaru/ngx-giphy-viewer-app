import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'ngv-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
    @Input() set query(value: string) {
        this.addSearchTags(this.parseSearchTags(value));
    }
    @Output() queryChange: EventEmitter<string> = new EventEmitter<string>();

    public searchForm = new FormGroup({
        query: new FormControl('', [Validators.maxLength(50)]),
    });

    public searchTags: string[] = [];

    constructor() {}

    onClickSubmit() {
        const newSearchTags = this.parseSearchTags(this.searchQuery).filter(
            (tag) => !this.hasSearchTag(tag)
        );
        if (newSearchTags.length) {
            this.addSearchTags(newSearchTags);
            this.emitQueryChange();
        }

        this.searchForm.reset();
    }

    onClickTagRemove(tag: string) {
        if (this.removeSearchTag(tag)) {
            this.emitQueryChange();
        }
    }

    private get searchQuery(): string {
        return this.searchForm.value.query;
    }

    private emitQueryChange() {
        this.queryChange.emit(this.searchTags.join(' '));
    }

    private parseSearchTags(searchQuery: string = ''): string[] {
        return searchQuery.split(' ').filter((tag: string) => tag.length > 0);
    }

    private addSearchTags(tags: string[] = []) {
        this.searchTags = [...new Set([...this.searchTags, ...tags])];
    }

    private removeSearchTag(tag: string, tags = this.searchTags): boolean {
        const tagIndex = tags.indexOf(tag);
        return tagIndex === -1 ? false : !!tags.splice(tagIndex, 1).length;
    }

    private hasSearchTag(tag: string, tags = this.searchTags): boolean {
        return tags.includes(tag);
    }
}

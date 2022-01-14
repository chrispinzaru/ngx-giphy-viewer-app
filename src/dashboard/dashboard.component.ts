import { Component, OnInit } from '@angular/core';
import { GiphyApiService } from '../app/core/services/giphy-api.service';
import {
    Gif,
    Pagination,
    SearchResponse,
} from '../app/core/services/giphy.interface';
import {
    BehaviorSubject,
    combineLatest,
    distinctUntilChanged,
    map,
    Observable,
    of,
    shareReplay,
    startWith,
    switchMap,
    tap,
} from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'ngv-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    public initialSearchQuery: string;
    public pagination: Pagination;

    public gifs$: Observable<Gif[]>;
    public noGifsFound$: Observable<boolean>;

    private pageChange$: BehaviorSubject<number> = new BehaviorSubject<number>(
        1
    );
    private queryChange$: BehaviorSubject<string> = new BehaviorSubject<string>(
        ''
    );

    constructor(
        private router: Router,
        private giphyApiService: GiphyApiService
    ) {}

    ngOnInit() {
        this.updatePagination();
        this.initSearchParams();

        const pageChange$ = this.pageChange$.pipe(
            tap((value) => {
                this.pagination.offset = value;
            })
        );

        this.gifs$ = combineLatest([this.queryChange$, pageChange$]).pipe(
            distinctUntilChanged(),
            switchMap(([query, page]) => {
                if (query.length > 0) {
                    return this.giphyApiService.search(
                        query,
                        this.pagination.offset
                    );
                } else {
                    return of({ data: [] } as SearchResponse);
                }
            }),
            tap(() => this.updateUrlSearchParams()),
            tap((response: SearchResponse) =>
                this.updatePagination(response.pagination)
            ),
            map((response) => response.data),
            shareReplay()
        );

        this.noGifsFound$ = this.gifs$.pipe(
            startWith([]),
            map((results) => results.length === 0)
        );
    }

    public onSearchQueryChange(searchQuery: string) {
        this.pagination.offset = 1;
        this.queryChange$.next(searchQuery);
    }

    public onPageChange(page: number) {
        this.pageChange$.next(page);
    }

    public trackByFn(index: number, item: Gif): string {
        return item.id;
    }

    private initSearchParams() {
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.has('page')) {
            this.pagination.offset = Number(queryParams.get('page')) ?? 1;
        }

        if (queryParams.has('q')) {
            this.initialSearchQuery = queryParams.get('q') ?? '';
        }
    }

    private updateUrlSearchParams() {
        this.router.navigate([], {
            queryParams: {
                q: this.queryChange$.value,
                page: this.pagination.offset,
            },
        });
    }

    private updatePagination(
        pagination: Pagination = { count: 0, offset: 0, total_count: 0 }
    ) {
        this.pagination = pagination;
    }
}

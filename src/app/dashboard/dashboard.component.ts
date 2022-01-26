import { Component, OnDestroy, OnInit } from '@angular/core';
import { GiphyApiService } from '../core/services/giphy-api.service';
import { Gif, Pagination, SearchParams, SearchResponse } from '../core/services/giphy.interface';
import {
    BehaviorSubject,
    Observable,
    Subject,
    distinctUntilChanged,
    debounceTime,
    shareReplay,
    switchMap,
    takeUntil,
    map,
    tap,
    ReplaySubject,
    catchError,
    of,
    filter,
    finalize,
} from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

type SearchQueryParams = {
    q: string;
    page: number;
};

const SEARCH_LIMIT_PER_PAGE = 9;

@Component({
    selector: 'ngv-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    private readonly searchQueryParamsSource: ReplaySubject<SearchQueryParams> =
        new ReplaySubject<SearchQueryParams>(1);
    private readonly loadingSource$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private readonly destroyed$: Subject<boolean> = new Subject<boolean>();
    private searchRequest$: Observable<SearchResponse>;

    public gifs$: Observable<Gif[]>;
    public gifsNotFound$: Observable<boolean>;

    public searchQueryParams: SearchQueryParams = { q: '', page: 1 };
    public searchPagination: Pagination = this.defaultSearchPagination;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private giphyApiService: GiphyApiService
    ) {}

    ngOnInit() {
        this.searchRequest$ = this.searchQueryParamsSource.asObservable().pipe(
            filter((params: SearchQueryParams) => params.q != null && !isNaN(params.page)),
            distinctUntilChanged((previous, current) =>
                this.isEqualSearchQueryParams(previous, current)
            ),
            tap((params: SearchQueryParams) => {
                this.setSearchQueryParams(params);
                this.indicateLoadingStart();
            }),
            map((params: SearchQueryParams) => {
                return {
                    q: params.q,
                    offset: (params.page - 1) * SEARCH_LIMIT_PER_PAGE,
                    limit: SEARCH_LIMIT_PER_PAGE,
                } as SearchParams;
            }),
            switchMap((params) => {
                return this.giphyApiService.search(params).pipe(
                    tap((response) => {
                        this.setSearchPagination(response.pagination);
                    }),
                    finalize(() => this.indicateLoadingEnd()),
                    catchError((error) => {
                        console.error(error);
                        // TODO: add error handling
                        return of({
                            data: [],
                            pagination: this.defaultSearchPagination,
                        } as SearchResponse);
                    })
                );
            }),
            shareReplay()
        );

        this.gifs$ = this.searchRequest$.pipe(map((response) => response.data));
        this.gifsNotFound$ = this.gifs$.pipe(map((results) => results.length === 0));

        this.activatedRoute.queryParams
            .pipe(takeUntil(this.destroyed$), debounceTime(100))
            .subscribe((queryParams: Params) => {
                const searchParams: SearchQueryParams = {
                    q: queryParams['q'],
                    page: Number(queryParams['page']),
                };
                this.searchQueryParamsSource.next(searchParams);
            });
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    onSearchQueryChange(searchQuery: string) {
        this.applySearchQueryParams({
            q: searchQuery,
            page: 1,
        });
    }

    onPageChange(page: number) {
        this.applySearchQueryParams({
            ...this.searchQueryParams,
            page,
        });
    }

    setSearchQueryParams(params: SearchQueryParams) {
        this.searchQueryParams = params;
    }

    setSearchPagination(pagination: Pagination) {
        this.searchPagination = pagination;
    }

    applySearchQueryParams(queryParams: SearchQueryParams) {
        this.router.navigate([], {
            queryParams,
            queryParamsHandling: 'merge',
        });
    }

    isEqualSearchQueryParams(first: SearchQueryParams, second: SearchQueryParams) {
        return JSON.stringify(first) === JSON.stringify(second);
    }

    trackByFn(index: number, item: Gif): string {
        return item.id;
    }

    get loading(): boolean {
        return this.loadingSource$.getValue();
    }

    private indicateLoadingStart() {
        this.loadingSource$.next(true);
    }

    private indicateLoadingEnd() {
        this.loadingSource$.next(false);
    }

    private get defaultSearchPagination(): Pagination {
        return { count: 0, offset: 0, total_count: 0 };
    }
}

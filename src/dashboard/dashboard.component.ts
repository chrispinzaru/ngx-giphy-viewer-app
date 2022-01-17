import { Component, OnDestroy, OnInit } from '@angular/core';
import { GiphyApiService } from '../app/core/services/giphy-api.service';
import {
    Gif,
    Pagination,
    SearchParams,
    SearchResponse,
} from '../app/core/services/giphy.interface';
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
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'ngv-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    private paramsChangeSource$: ReplaySubject<SearchParams> = new ReplaySubject<SearchParams>(1);
    private paramsChange$: Observable<SearchResponse>;
    private loadingSource$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private destroyed$: Subject<boolean> = new Subject<boolean>();

    public gifs$: Observable<Gif[]>;
    public notFound$: Observable<boolean>;

    public searchQuery: string = '';
    public pagination: Pagination = this.defaultPagination;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private giphyApiService: GiphyApiService
    ) {}

    ngOnInit() {
        this.paramsChange$ = this.paramsChangeSource$.asObservable().pipe(
            distinctUntilChanged((previous, current) =>
                this.isEqualSearchQueryParams(previous, current)
            ),
            tap(() => this.indicateLoadingStart()),
            tap((params) => this.setSearchQuery(params.q)),
            switchMap((params) => this.giphyApiService.search(params)),
            tap((response) => this.setPagination(response.pagination)),
            tap(() => this.indicateLoadingEnd()),
            shareReplay()
        );

        this.gifs$ = this.paramsChange$.pipe(map((response) => response.data));

        this.notFound$ = this.gifs$.pipe(map((results) => results.length === 0));

        this.activatedRoute.queryParams
            .pipe(takeUntil(this.destroyed$), debounceTime(100))
            .subscribe((queryParams) => {
                const searchParams: SearchParams = {
                    q: queryParams['q'],
                    offset: +queryParams['offset'],
                };
                if (searchParams.q != null && !isNaN(<number>searchParams.offset)) {
                    this.paramsChangeSource$.next(searchParams);
                }
            });
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    onSearchQueryChange(searchQuery: string) {
        this.applySearchQueryParams({
            q: searchQuery,
            offset: 1,
        });
    }

    onPageChange(page: number) {
        this.applySearchQueryParams({
            q: this.searchQuery,
            offset: page,
        });
    }

    setPagination(pagination: Pagination = this.defaultPagination) {
        this.pagination = this.normalizePagination(pagination);
    }

    normalizePagination(pagination: Pagination) {
        pagination.offset = pagination.offset === 0 ? 1 : pagination.offset;
        return pagination;
    }

    setSearchQuery(query: string = '') {
        this.searchQuery = query;
    }

    applySearchQueryParams(queryParams: SearchParams) {
        this.router.navigate([], {
            queryParams,
            queryParamsHandling: 'merge',
        });
    }

    isEqualSearchQueryParams(first: SearchParams, second: SearchParams) {
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

    private get defaultPagination(): Pagination {
        return { count: 0, offset: 1, total_count: 0 };
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SearchParams, SearchResponse } from './giphy.interface';

@Injectable({
    providedIn: 'root',
})
export class GiphyApiService {
    protected readonly apiEndpoint = 'https://api.giphy.com/v1/';
    protected readonly apiSearchEndpoint = `${this.apiEndpoint}gifs/search`;

    constructor(private httpClient: HttpClient) {}

    search({ q = '', offset = 0, limit = 9 }: SearchParams): Observable<SearchResponse> {
        const httpParams: HttpParams = new HttpParams()
            .set('q', q)
            .set('offset', offset)
            .set('limit', limit);

        return this.httpClient.get<SearchResponse>(this.apiSearchEndpoint, {
            params: httpParams,
        });
    }
}

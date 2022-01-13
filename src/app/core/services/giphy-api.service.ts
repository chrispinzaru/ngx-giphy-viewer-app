import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResponse } from './giphy.interface';

@Injectable({
    providedIn: 'root',
})
export class GiphyApiService {
    protected readonly apiEndpoint = 'https://api.giphy.com/v1/';
    protected readonly apiSearchEndpoint = `${this.apiEndpoint}gifs/search/`;

    constructor(private httpClient: HttpClient) {}

    get(searchQuery: string = ''): Observable<SearchResponse> {
        return this.httpClient.get<SearchResponse>(this.apiSearchEndpoint, {
            params: new HttpParams().set('q', searchQuery),
        });
    }
}

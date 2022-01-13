import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

const giphyApiEndpoint = new RegExp(/api\.giphy\.com/);

@Injectable({
    providedIn: 'root',
})
export class GiphyInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        if (request.method === 'GET' && giphyApiEndpoint.test(request.url)) {
            request = request.clone({
                params: request.params.set('api_key', environment.giphyApiKey),
            });
        }
        return next.handle(request);
    }
}

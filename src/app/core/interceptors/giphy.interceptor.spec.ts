import { TestBed } from '@angular/core/testing';

import { GiphyInterceptor } from './giphy.interceptor';

describe('GiphyInterceptor', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [GiphyInterceptor],
        })
    );

    it('should be created', () => {
        const interceptor: GiphyInterceptor = TestBed.inject(GiphyInterceptor);
        expect(interceptor).toBeTruthy();
    });
});

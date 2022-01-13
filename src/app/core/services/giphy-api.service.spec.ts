import { TestBed } from '@angular/core/testing';

import { GiphyApiService } from './giphy-api.service';
import { HttpClientModule } from '@angular/common/http';

describe('GiphyApiService', () => {
    let service: GiphyApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
        });
        service = TestBed.inject(GiphyApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

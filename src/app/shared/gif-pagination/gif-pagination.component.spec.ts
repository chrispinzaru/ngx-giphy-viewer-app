import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifPaginationComponent } from './gif-pagination.component';

describe('GifPaginationComponent', () => {
    let component: GifPaginationComponent;
    let fixture: ComponentFixture<GifPaginationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GifPaginationComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GifPaginationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

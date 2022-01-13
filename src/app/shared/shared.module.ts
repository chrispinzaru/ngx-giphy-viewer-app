import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { GifCardComponent } from './gif-card/gif-card.component';
import { GifPaginationComponent } from './gif-pagination/gif-pagination.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        SearchFormComponent,
        GifCardComponent,
        GifPaginationComponent,
    ],
    imports: [CommonModule, NgbPaginationModule],
    exports: [
        HeaderComponent,
        FooterComponent,
        SearchFormComponent,
        GifCardComponent,
        GifPaginationComponent,
    ],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { GifCardComponent } from './gif-card/gif-card.component';
import { GifPaginationComponent } from './gif-pagination/gif-pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchTagComponent } from './search-tag/search-tag.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        SearchFormComponent,
        GifCardComponent,
        GifPaginationComponent,
        SearchTagComponent,
    ],
    imports: [
        CommonModule,
        NgbPaginationModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SearchFormComponent,
        GifCardComponent,
        GifPaginationComponent,
    ],
})
export class SharedModule {}

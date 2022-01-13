import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbPaginationModule,
    NgbButtonsModule,
} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [HeaderComponent, FooterComponent],
    imports: [CommonModule, NgbPaginationModule, NgbButtonsModule],
    exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { routes } from './app.routes';

@NgModule({
    declarations: [AppComponent, DashboardComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        CoreModule,
        SharedModule,
        RouterModule.forRoot(routes),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

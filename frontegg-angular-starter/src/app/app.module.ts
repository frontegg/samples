import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@frontegg/ng-core';
import { AuthModule } from '@frontegg/ng-auth';
import { ConnectivityModule } from '@frontegg/ng-connectivity';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { AuditsModule } from '@frontegg/ng-audits';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot({
      context: {
        baseUrl: `http://localhost:8080`,
        requestCredentials: 'include',
      },
    }),
    AuthModule.forRoot({}),
    AuditsModule.forRoot(),
    ConnectivityModule.forRoot(),

    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}

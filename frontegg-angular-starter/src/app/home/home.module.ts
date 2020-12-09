import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { CoreModule } from '@frontegg/ng-core';
import { AuthModule } from '@frontegg/ng-auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent],
  imports: [CoreModule, AuthModule, CommonModule, RouterModule],
  exports: [HomeComponent],
})
export class HomeModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { withFronteggRoutes } from '@frontegg/ng-core';
import { AuthGuard, ProfileComponent, SsoPageComponent, TeamPageComponent } from '@frontegg/ng-auth';
import { HomeComponent } from './home/home.component';
import { ConnectivityComponent } from '@frontegg/ng-connectivity';
import { AuditsComponent } from '@frontegg/ng-audits';

const routes: Routes = withFronteggRoutes([
  { path: '', component: HomeComponent },
  {
    path: 'profile',
    children: [
      {
        path: '**',
        component: ProfileComponent,
      },
    ],
  },
  {
    path: 'sso',
    children: [
      {
        path: '**',
        component: SsoPageComponent,
      },
    ],
  },
  {
    path: 'team',
    canActivate: [AuthGuard],
    children: [
      {
        path: '**',
        component: TeamPageComponent,
      },
    ],
  }, {
    path: 'connectivity',
    canActivate: [AuthGuard],
    children: [
      {
        path: '**',
        component: ConnectivityComponent,
      },
    ],
  }, {
    path: 'audits',
    canActivate: [AuthGuard],
    component: AuditsComponent,
  },
]);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

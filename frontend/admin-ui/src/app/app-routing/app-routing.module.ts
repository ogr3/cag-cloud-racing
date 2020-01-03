import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UsersComponent } from '../view-components/users/users.component'
import { DashboardComponent } from '../view-components/dashboard/dashboard.component'
import { ManageRaceComponent } from '../view-components/manage-race/manage-race.component'

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'race', component: ManageRaceComponent },
  { path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
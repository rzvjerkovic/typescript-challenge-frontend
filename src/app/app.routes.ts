import { Routes } from '@angular/router'
import { DetailComponent } from './detail/detail.component'
import { HomeComponent } from './home/home.component'
import { AddStopComponent } from './add-stop/add-stop.component'

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'detail', component: DetailComponent },
  { path: 'add-stop', component: AddStopComponent },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
]

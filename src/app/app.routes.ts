import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';

import { ListadoPacientes } from './components/pages/listado-pacientes/listado-pacientes';
import { Unauthorized } from './components/pages/unauthorized/unauthorized';

export const routes: Routes = [
{
    path:'',
    redirectTo: 'dashboard',
    pathMatch: 'full'
},
{
    path: 'unauthorized',
    component: Unauthorized
},
{
    path: 'login',
    component: Login
},
{
    path: 'register',
    component: Register
}
,
{
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
    data: {roles: ['1','2']}
},
{
    path: 'listadopacientes',
    component: ListadoPacientes,
    canActivate: [authGuard],
    data: {roles: ['1','2']}
},
{
    path:'**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
},


];

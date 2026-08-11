import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { ListadoUbicacion } from './components/pages/ubicacion/listado-ubicacion/listado-ubicacion';
import { EditUbicacion } from './components/pages/ubicacion/edit-ubicacion/edit-ubicacion';
import { Listadofamilia } from './components/pages/familias/listado-familias/listado-familias';
import { EditFamilia } from './components/pages/familias/edit-familia/edit-familia';

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
    path: 'listadoUbicaciones',
    component: ListadoUbicacion,
    canActivate: [authGuard],
    data: {roles: ['1','2']}
},
{
    path: 'editUbicacion/:id',
    component: EditUbicacion,
    canActivate: [authGuard],
    data: {roles: ['1','2']}
},
{
    path: 'listadoFamilias',
    component: Listadofamilia,
    canActivate: [authGuard],
    data: {roles: ['1','2']}
},
{
    path: 'editFamilia/:id',
    component: EditFamilia,
    canActivate: [authGuard],
    data: {roles: ['1','2']}
},
{
    path:'**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
},


];

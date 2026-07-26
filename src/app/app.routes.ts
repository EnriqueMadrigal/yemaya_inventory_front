import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';

import { ListadoPacientes } from './components/pages/listado-pacientes/listado-pacientes';
import { Unauthorized } from './components/pages/unauthorized/unauthorized';
import { EditPaciente } from './components/pages/edit-paciente/edit-paciente';
import { SelecionaPaciente } from './components/pages/seleciona-paciente/seleciona-paciente';
import { SelecionaHistoria } from './components/pages/seleciona-historia/seleciona-historia';
import { EditHeredoFamiliares } from './components/pages/edit-heredo-familiares/edit-heredo-familiares';

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
    path: 'editPaciente/:id',
    component: EditPaciente,
    canActivate: [authGuard],
    data: {roles: ['1','2']}
},
{
    path: 'seleccionaPacientes',
    component: SelecionaPaciente,
    canActivate: [authGuard],
    data: {roles: ['1','2']}
},
{
    path: 'seleccionaHistoria/:id',
    component: SelecionaHistoria,
    canActivate: [authGuard],
    data: {roles: ['1','2']}
},
{
    path: 'editHeredoFamiliares/:id',
    component: EditHeredoFamiliares,
    canActivate: [authGuard],
    data: {roles: ['1','2']}
},
{
    path:'**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
},


];

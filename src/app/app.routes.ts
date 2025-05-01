import { Routes } from '@angular/router';
import {LoginComponent} from './page/login/login.component'
import {RegisterComponent} from './page/register/register.component'
import {RaComponent} from './page/ra/ra.component'


export const routes: Routes = [


    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'ra',
        component: RaComponent
    },


];

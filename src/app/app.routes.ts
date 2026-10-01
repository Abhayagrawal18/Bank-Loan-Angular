import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { ApplicationForm } from './pages/application-form/application-form';
import { ApplicationList } from './pages/application-list/application-list';
import { RegisterCustomer } from './pages/register-customer/register-customer';

export const routes: Routes = [
    {path: '' , redirectTo: 'home' , pathMatch: 'full'},
    {path: 'home' , component:Home},
    {path: 'login' , component: Login},
    {path: 'new-application' , component:ApplicationForm},
    {path: 'register-customer' , component: RegisterCustomer},
    {path: 'application-list' , component: ApplicationList}
    
];

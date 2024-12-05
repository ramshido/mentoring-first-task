import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuardEntrance, authGuardExit } from './guards/auth.guard'

export const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full',
	},
	{
		path: 'admin',
		loadChildren: () => import('./components/admin/admin.module').then((module) => // Обращаемся к дочернемо модулю (приложение внутри большого приложение-проекта)
			module.AdminModule
		),
		canActivate: [authGuardEntrance],
		canDeactivate: [authGuardExit],
	},
	{
		path: '**',
		component: NotFoundComponent,
	},

];

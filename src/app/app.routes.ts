import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { MainCardsComponent } from './main-cards/main-cards.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { checkAdminGuard } from './guards/check-admin.guard';
import { exitGuard } from './guards/exit.guard';

export const routes: Routes = [
	{
		path: '',
		component: MainCardsComponent
	},
	{
		path: 'users',
		component: UsersListComponent
	},
	{
		path: 'todos',
		component: TodosListComponent
	},
	{
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [checkAdminGuard],
    canDeactivate: [exitGuard],
  },
];

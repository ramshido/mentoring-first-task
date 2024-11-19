import { Routes } from '@angular/router';
import { MainCardsComponent } from './domain/homepage/main-cards/main-cards.component';
import { AdminPageComponent } from './domain/admin-page/admin-page.component';
import { checkAdminGuard } from './domain/admin-page/guards/check-admin.guard';
import { exitGuard } from './domain/admin-page/guards/exit.guard';
import { UsersListComponent } from './domain/users/components/users-list/users-list.component';
import { TodosListComponent } from './domain/todos/components/todos-list/todos-list.component';

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

import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { MainCardsComponent } from './main-cards/main-cards.component';

export const routes: Routes = [
	{
		path: '',
		component: MainCardsComponent
	},
	{
		path: 'users',
		component: UsersListComponent
	}
];

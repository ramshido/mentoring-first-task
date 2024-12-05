import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactsDetailsComponent } from './components/contacts-details/contacts-details.component';
import { HomeComponent } from './components/home/home.component';
import { userResolver } from './resolvers/user.resolver';
import { usersResolver } from './resolvers/users.resolver';

const routes: Routes = [
	{
		path: '',
		component: AdminDashboardComponent,
		children: [
			{ 
				path: 'contacts',
				component: ContactsComponent,
				resolve: {
					users: usersResolver
				}
			},
			{
				path: 'contacts/user/:id',
				component: ContactsDetailsComponent,
				resolve: {
					user: userResolver
				}
			},
			{ path: 'contacts/user', redirectTo: 'contacts', pathMatch: 'full' },
			{ path: 'home', component: HomeComponent, },
			{ path: '', pathMatch: 'full', redirectTo: 'home' },
		],
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }

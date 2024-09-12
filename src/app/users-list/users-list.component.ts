import { NgFor, NgIf } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";

export interface IUser {
	id: number,
	name: string,
	username: string,
	email: string,
	address: {
		street: string,
		suites: string,
		city: string,
		zipcode: string,
		geo: {
			lat: string,
			lng: string
		};
	};
	phone: string,
	website: string,
	company: {
		name: string,
		catchPhrase: string,
		bs: string
	};
}


@Component({
	selector: 'app-users-list',
	standalone: true,
	imports: [NgIf, NgFor],
	templateUrl: './users-list.component.html',
	styleUrl: './users-list.component.scss',
})

export class UsersListComponent {
	readonly api = inject(HttpClient);
	users: IUser[] = [];

	constructor() {
		this.api.get<IUser[]>('https://jsonplaceholder.typicode.com/users').subscribe((response: any) => {
			this.users = response;
		})
	}

	deleteUser(id: number) {
		this.users = this.users.filter(item => item.id !== id);
	}
}
import { NgFor} from "@angular/common";
import { Component, inject } from "@angular/core";
import { UsersApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";

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
	imports: [NgFor, UserCardComponent],
	templateUrl: './users-list.component.html',
	styleUrl: './users-list.component.scss',
})

export class UsersListComponent {
	// readonly api = inject(HttpClient); // после создания сервиса отдельного, здесь запросы уже не нужны (закомментированные), это делает код лаконичным, и реализует принцип:
	// "Собственная ответственность"
	readonly usersApiService = inject(UsersApiService);
	users: IUser[] = [];

	constructor() {
		this.usersApiService.getUsers().subscribe((response: any) => {
			this.users = response;
		})
	}   

	deleteUser(id: number) {
		this.users = this.users.filter(item => item.id !== id);
	}
}
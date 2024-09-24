import { AsyncPipe, NgFor } from "@angular/common";
import { Component, inject } from "@angular/core";
import { UsersApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";
import { ChangeDetectionStrategy } from "@angular/core";

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
	imports: [NgFor, UserCardComponent, AsyncPipe],
	templateUrl: './users-list.component.html',
	styleUrl: './users-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent {
	// readonly api = inject(HttpClient); // после создания сервиса отдельного, здесь запросы уже не нужны (закомментированные), это делает код лаконичным, и реализует принцип:
	// "Собственная ответственность"
	readonly usersApiService = inject(UsersApiService);
	readonly usersService = inject(UsersService);

	constructor() {
		this.usersApiService.getUsers().subscribe((response: any) => {
			this.usersService.getUser(response);
		});

		// this.usersService.usersSubject.subscribe(
		// 	items => this.users = items
		// );
	}

	deleteUser(id: number) {
		this.usersService.deleteUser(id);
	}
}
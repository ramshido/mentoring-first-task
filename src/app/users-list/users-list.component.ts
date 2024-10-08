import { AsyncPipe, NgFor } from "@angular/common";
import { Component, inject } from "@angular/core";
import { UsersApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";
import { ChangeDetectionStrategy } from "@angular/core";
import { CreateUserForm } from "../create-user-form/create-user-form.component";
import { ICreateUser} from "../Interfaces/IUserInterface";

@Component({
	selector: 'app-users-list',
	standalone: true,
	imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserForm],
	templateUrl: './users-list.component.html',
	styleUrl: './users-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
	// readonly api = inject(HttpClient); // после создания сервиса отдельного, здесь запросы уже не нужны (закомментированные), это делает код лаконичным, и реализует принцип:
	// "Собственная ответственность"
	private readonly usersApiService = inject(UsersApiService);
	public readonly usersService = inject(UsersService);

	constructor() {
		this.usersApiService.getUsers().subscribe((response: any) => {
			this.usersService.getUser(response);
		});

		// this.usersService.usersSubject.subscribe(
		// 	items => this.users = items
		// );
	}

	public deleteUser(id: number) {
		this.usersService.deleteUser(id);
	}

	public createUser(user: ICreateUser) {
		this.usersService.createUser({
			id: new Date().getTime(),
			name: user.name,
			email: user.email,
			website: user.website,
			company:  {
				name: user.companyName,
			},
		});	
	}
}
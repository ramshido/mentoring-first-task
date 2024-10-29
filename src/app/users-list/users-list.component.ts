import { AsyncPipe, NgFor } from "@angular/common";
import { Component, inject } from "@angular/core";
import { UsersApiService } from "../services/users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../services/users.service";
import { ChangeDetectionStrategy } from "@angular/core";
import { CreateUserForm } from "../create-user-form/create-user-form.component";
import { ICreateUser, IUser } from "../interfaces/user.interface";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from "@angular/material/dialog";
import { CreateUserDialogComponent } from "./create-user-dialog/create-user-dialog.component";
import { ShadowSetDirective } from "../directives/shadows.directive";

@Component({
	selector: 'app-users-list',
	standalone: true,
	imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserForm, MatButtonModule, MatIconModule, ShadowSetDirective],
	templateUrl: './users-list.component.html',
	styleUrl: './users-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
	// readonly api = inject(HttpClient); // после создания сервиса отдельного, здесь запросы уже не нужны (закомментированные), это делает код лаконичным, и реализует принцип:
	// "Собственная ответственность"
	private readonly usersApiService = inject(UsersApiService);
	public readonly usersService = inject(UsersService);

	private readonly dialog = inject(MatDialog);

	constructor() {
		this.usersApiService.getUsers().subscribe((response: IUser[]) => {
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
		this.usersService.createUser(user);
	}

	public editUser(formDialogValue: IUser) {
		this.usersService.editUser(formDialogValue);
		console.log('Обновленные данные пользователя', formDialogValue);
	}

	public openDialog(): void {
		const dialogRef = this.dialog.open(CreateUserDialogComponent, {
			width: '600px',
		});
		
		const dialogComponentInstance = dialogRef.componentInstance; // .componentInstance — это свойство объекта MatDialogRef, которое предоставляет доступ к экземпляру компонента, используемого в диалоговом окне.

		dialogComponentInstance.dataSubject.subscribe(data => {
			// Обрабатываем данные, полученные из диалога
			if (data) {
				console.log('Полученные данные:', data);
				this.createUser(data);
			}
			// dialogRef.close(); для закрытия диалогового окна
		});

		// const dialogRef = this.dialog.open(CreateUserDialogComponent, {
		// 	width: '600px',
		// 	data: {name: 'hello'},
		// })
		// .afterClosed()
		// .subscribe(editResult => {
		// 	if (editResult) console.log('close dialog');
		// 	;
		// });
	}
}
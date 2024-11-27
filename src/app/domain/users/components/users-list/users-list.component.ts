import { AsyncPipe, NgFor } from "@angular/common";
import { Component, inject } from "@angular/core";
import { UserCardComponent } from "../user-card/user-card.component";
import { ChangeDetectionStrategy } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from "@angular/material/dialog";
import { CreateUserDialogComponent } from "../create-user-dialog/create-user-dialog.component";
import { CreateUserForm } from "../create-user-form/create-user-form.component";
import { ShadowSetDirective } from "../../../../shared/directives/shadows.directive";
import { ICreateUser, IUser } from "../../interfaces/user.interface";
import { Store } from "@ngrx/store";
import { UsersApiService } from "../../services/users-api.service";
import { UsersActions } from "../../+state/users.actions";
import { selectUsers } from "../../+state/users.selectors";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
	selector: 'app-users-list',
	standalone: true,
	imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserForm, MatButtonModule, MatIconModule, ShadowSetDirective],
	templateUrl: './users-list.component.html',
	styleUrl: './users-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
	private readonly dialog = inject(MatDialog);
	private readonly store = inject(Store);
	private readonly usersApiService = inject(UsersApiService);
	public readonly users$ = this.store.select(selectUsers);
	private readonly _snackBar = inject(MatSnackBar);

	constructor() {
		this.usersApiService.getUsers().subscribe((usersArray: IUser[]) => {
			this.store.dispatch(UsersActions.set({ users: usersArray }));
		});
	}

	public deleteUser(id: number) {
		if (confirm('Вы точно хотите удалить карточку пользователя?')) {
			this.store.dispatch(UsersActions.delete({ id }));
			this._snackBar.open('Пользователь удален', 'Ок').afterDismissed().subscribe(() => { });
		}
	}

	public createUser(user: ICreateUser) {
		this.store.dispatch(UsersActions.create({ user }));
		this._snackBar.open('Пользователь создан', 'Ок');
	}

	public editUser(user: IUser) {
		this._snackBar.open('Пользователь отредатирован', 'Ок');
		this.store.dispatch(UsersActions.edit({ user }));
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
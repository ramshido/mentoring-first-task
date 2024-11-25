import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from "../interfaces/user.interface";

@Injectable(
	{ providedIn: 'root' }
)
export class UsersService {
	private readonly usersSubject$ = new BehaviorSubject<IUser[]>([]);
	public readonly usersObservable$ = this.usersSubject$.asObservable();
	private _snackBar = inject(MatSnackBar);

	public loadUsers(usersArray: IUser[]) {
		this.usersSubject$.next(usersArray);
	};

	public editUser(editedUser: IUser) {
		this.usersSubject$.next(
			this.usersSubject$.value.map(user => user.id === editedUser.id ? editedUser : user
	));
		this._snackBar.open('Пользователь отредатирован', 'Ок');
	};

	public createUser(user: IUser) {
		const userExisting = this.usersSubject$.value.find(
			currentElement => currentElement.email === user.email
		);
		if (userExisting === undefined) {
			const newUser = [...this.usersSubject$.value, user];
			this.usersSubject$.next(newUser);
			this._snackBar.open('Пользователь создан', 'Ок');
		} else alert('Такой Email уже есть');
	};

	public deleteUser(userId: number) {
		const findUser = this.usersSubject$.value.find(user => user.id === userId);
		const newUsersArray = this.usersSubject$.value.filter(user => user.id !== userId);

		if (findUser && confirm('Вы точно хотите удалить карточку пользователя ' + findUser.name + '?')) {
			this.usersSubject$.next(newUsersArray);
			this._snackBar.open('Пользователь удален', 'Ок').afterDismissed().subscribe(() => { });
		}
	};
}

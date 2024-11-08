import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IUser } from "../interfaces/user.interface";
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from "./localStorage.service";
import { UsersApiService } from "./users-api.service";

@Injectable(
	{ providedIn: 'root' }
)
export class UsersService {
	private readonly usersSubject$ = new BehaviorSubject<IUser[]>([]);
	public readonly usersObservable$ = this.usersSubject$.asObservable();

	private _snackBar = inject(MatSnackBar);
	private readonly localStorage = inject(LocalStorageService);
	private readonly usersApiService = inject(UsersApiService);

	loadUsers() {
		const localStorageUsers = this.localStorage.getUsersFromLocalStorage<IUser[]>('users');

		if (localStorageUsers) {
			this.usersSubject$.next(localStorageUsers);
		} else {
			this.usersApiService.getUsers().subscribe((data: IUser[]) => {
				this.localStorage.saveUsersToLocalStorage<IUser[]>('users', data);
				this.usersSubject$.next(data);
			});
		}

	}

	editUser(editedUser: IUser) {
		const index = this.usersSubject$.value.findIndex(el => el.id === editedUser.id);
		this.usersSubject$.value[index] = editedUser;

    this.localStorage.saveUsersToLocalStorage('users', this.usersSubject$.value);
    this.usersSubject$.next(this.usersSubject$.value);
		this._snackBar.open('Пользователь отредатирован', 'Ок');
	}

	createUser(user: IUser) {
		const userExisting = this.usersSubject$.value.find(
			currentElement => currentElement.email === user.email
		);
		if (userExisting === undefined) {
			const newUser = [...this.usersSubject$.value, user]
			this.localStorage.saveUsersToLocalStorage('users', newUser);
			this.usersSubject$.next(newUser);
			this._snackBar.open('Пользователь создан', 'Ок');
		} else alert('Такой Email уже есть');
	}

	deleteUser(userId: number) {
		const findUser = this.usersSubject$.value.find(user => user.id === userId);
		const deleteUser = this.usersSubject$.value.filter(user => user.id !== userId);

		if (findUser && confirm('Вы точно хотите удалить карточку пользователя ' + findUser.name + '?')) {
			this.localStorage.saveUsersToLocalStorage('users', deleteUser);
			this.usersSubject$.next(deleteUser);
			this._snackBar.open('Пользователь удален', 'Ок').afterDismissed().subscribe(() => { });
		}
	}
}

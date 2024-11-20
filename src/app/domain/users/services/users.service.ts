import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from "../interfaces/user.interface";
import { LocalStorageService } from "../../../singleton/localStorage.service";
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

	private readonly localStorageUsersKey = 'users';

	private setDataToLocalStorageUsersSubject(usersArray: IUser[]): void {
		this.localStorage.saveDataToLocalStorage<IUser[]>(this.localStorageUsersKey, usersArray);
		this.usersSubject$.next(usersArray);
	};

	public loadUsers() {
		const localStorageUsers = this.localStorage.getDataFromLocalStorage<IUser[]>(this.localStorageUsersKey);

		if (localStorageUsers) {
			this.usersSubject$.next(localStorageUsers);
		} else {
			this.usersApiService.getUsers().subscribe((data: IUser[]) => {
				this.setDataToLocalStorageUsersSubject(data);
			});
		}
	};

	public editUser(editedUser: IUser) {
		const index = this.usersSubject$.value.findIndex(el => el.id === editedUser.id);
		this.usersSubject$.value[index] = editedUser;

		this.setDataToLocalStorageUsersSubject(this.usersSubject$.value);
		this._snackBar.open('Пользователь отредатирован', 'Ок');
	};

	public createUser(user: IUser) {
		const userExisting = this.usersSubject$.value.find(
			currentElement => currentElement.email === user.email
		);
		if (userExisting === undefined) {
			const newUser = [...this.usersSubject$.value, user];
			this.setDataToLocalStorageUsersSubject(newUser);
			this._snackBar.open('Пользователь создан', 'Ок');
		} else alert('Такой Email уже есть');
	};

	public deleteUser(userId: number) {
		const findUser = this.usersSubject$.value.find(user => user.id === userId);
		const newUsersArray = this.usersSubject$.value.filter(user => user.id !== userId);

		if (findUser && confirm('Вы точно хотите удалить карточку пользователя ' + findUser.name + '?')) {
			this.setDataToLocalStorageUsersSubject(newUsersArray);
			this._snackBar.open('Пользователь удален', 'Ок').afterDismissed().subscribe(() => { });
		}

		if (!this.usersSubject$.value.length) {
			this.localStorage.removeLocalStorage(this.localStorageUsersKey);
		}
	};
}

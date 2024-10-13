import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IUser } from "../interfaces/user.interface";

@Injectable({ providedIn: 'root' })

export class UsersService {
	private readonly usersSubject$ = new BehaviorSubject<IUser[]>([]);
	public readonly usersObservable$ = this.usersSubject$.asObservable();
	// users: IUser[] = [];

	getUser(users: IUser[]) {
		// this.users = users;
		this.usersSubject$.next(users);
	}

	editUser(editedUser: IUser) {
		// this.users = this.users.map(
		// 	item => (item.id === editedUser.id) ? editedUser : item
		// );
		this.usersSubject$.next(
			this.usersSubject$.value.map(
				item => (item.id === editedUser.id) ? editedUser : item
			)
		);
	}

	createUser(user: IUser) {
		// this.users = [...this.users, user];
		// или можем использовать concat - this.users = this.users.concat([user])
		const userExisting = this.usersSubject$.value.find(
			currentElement => currentElement.email === user.email
		);
		if (userExisting === undefined) this.usersSubject$.next([...this.usersSubject$.value, user]);
		else alert('Такой Email уже есть');
	}

	deleteUser(userId: number) {
		// this.users = this.users.filter((item) => item.id !== userId);

		this.usersSubject$.next(
			this.usersSubject$.value.filter(item => item.id !== userId)
		);
	}
}

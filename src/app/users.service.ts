import { Injectable } from "@angular/core";
import { IUser } from "./users-list/users-list.component";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })

export class UsersService {
	usersSubject = new BehaviorSubject<IUser[]>([]);
	// users: IUser[] = [];

	setUser(users: IUser[]) {
		// this.users = users;
		this.usersSubject.next(users)
	}

	editUser(editedUser: IUser) {
		// this.users = this.users.map(
		// 	item => (item.id === editedUser.id) ? editedUser : item
		// );
		this.usersSubject.next(
			this.usersSubject.value.map(
				item => (item.id === editedUser.id) ? editedUser : item
			)
		);
	}

	createUser(user: IUser) {
		// this.users = [...this.users, user];
		// или можем использовать concat - this.users = this.users.concat([user])

		this.usersSubject.next([...this.usersSubject.value, user]);
	}
	deleteUser(userId: number) {
		// this.users = this.users.filter((item) => item.id !== userId);

		this.usersSubject.next(
			this.usersSubject.value.filter(item => item.id !== userId)
		);
	}
}

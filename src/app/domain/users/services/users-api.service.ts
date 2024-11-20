import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IUser } from "../interfaces/user.interface";

@Injectable({ providedIn: 'root' })

export class UsersApiService {

	readonly api = inject(HttpClient);

	public getUsers() {
		return this.api.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
	}
}
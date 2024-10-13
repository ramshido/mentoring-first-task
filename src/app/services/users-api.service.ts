import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class UsersApiService {

	readonly api = inject(HttpClient);

	getUsers() {
		return this.api.get('https://jsonplaceholder.typicode.com/users')
	}
}
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IUserData } from "../user.interface";

@Injectable({
	providedIn: 'root'
})
export class AdminService {
	private readonly httpModule = inject(HttpClient);

	public getPersonalList() {
		return this.httpModule.get<IUserData[]>('https://jsonplaceholder.typicode.com/users?_start=0&_limit=5');
	}

	public getPerson(id: number) {
		return this.httpModule.get<IUserData>(`https://jsonplaceholder.typicode.com/users/${id}`);
	}

}
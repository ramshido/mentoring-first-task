import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UsersApiService } from "./users-api.service";
import { TodosApiService } from "./todos-api.service";
import { UsersService } from "./users.service";
import { TodosService } from "./todos.service";
import { IUser } from "../interfaces/user.interface";
import { ITodo } from "../interfaces/todo.interface";

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {
	private readonly usersApiService = inject(UsersApiService);
	private readonly todosApiService = inject(TodosApiService);
	private readonly usersService = inject(UsersService);
	private readonly todosService = inject(TodosService);

	private readonly localStorageSubject$ = new BehaviorSubject([]);
	public readonly localStorageObservable$ = this.localStorageSubject$.asObservable();

	public getUsersData() {
		this.usersApiService.getUsers().subscribe((response: IUser[]) => {
			this.usersService.getUser(response);
		});
	}

	public getTodosData() {
		this.todosApiService.getTodos().subscribe(
			(response: ITodo[]) => {
				return this.todosService.getTodo(response.slice(1, 11));
			});
	}

	// public addToStorage (storageName: string, data: any) {
	// 	let storageArr = [data];
	// 	const storageData = JSON.parse(localStorage.getItem(storageName));

	// 	if (storageData) {
	// 		if (storageData.map((el: any) => el.id).includes(data.id)) {
	// 			return;
	// 		}
	// 		storageArr = [...storageName, ...storageArr];
	// 	}
	// }

}
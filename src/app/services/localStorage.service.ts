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

	private readonly localStorageUserKey = 'users';
	private readonly localStorageTodoKey = 'todos';

	private readonly userLocalStorageSubject$ = new BehaviorSubject<IUser[]>([]);
	public readonly userLocalStorageObservable$ = this.userLocalStorageSubject$.asObservable();

	public async getUsersData() {
		let storageData: any = this.userLocalStorageSubject$.value;

		localStorage.getItem(this.localStorageUserKey); // 

		if (storageData) {
			this.userLocalStorageSubject$.subscribe((result: any) => {
				this.usersService.getUser(JSON.parse(result));
			});
			return;
		}
		
		this.usersApiService.getUsers().subscribe((response: IUser[]) => {
			// this.usersService.getUser(response);
			
			localStorage.setItem(this.localStorageUserKey, JSON.stringify(response));
			this.usersService.getUser(response);
		});
	};

	public getTodosData() { // а разработке...
		this.todosApiService.getTodos().subscribe(
			(response: ITodo[]) => {
				return this.todosService.getTodo(response.slice(1, 11));
			});
	};

	public getStorage(storageName: any) {
		let dataStorage: any = localStorage.getItem(storageName);
		return JSON.parse(dataStorage);
	};

	public addToStorage(storageName: string, data: any) {
		let storageArr = [data];
		const storageData = this.getStorage(storageName);

		if (storageData) {
			storageArr = [...storageData, ...storageArr];
		}
		localStorage.setItem(storageName, JSON.stringify(storageArr));
	};

	public removeFromStorage(id: number, storageName: any) {
		const storageData = this.getStorage(storageName);

		if (!storageData) {
			return;
		}

		storageData.splice(storageData.map((el: any) => el.id).indexOf(id), 1);

		if (!storageData.length) {
			localStorage.removeItem(storageName);
			return;
		}

		localStorage.setItem(storageName, JSON.stringify(storageData));
	};
}
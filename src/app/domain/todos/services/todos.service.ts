import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ITodo } from "../interfaces/todo.interface";
import { LocalStorageService } from "../../../singleton/localStorage.service";
import { TodosApiService } from "./todos-api.service";

@Injectable({ providedIn: 'root' })

export class TodosService {
	private readonly todosApiService = inject(TodosApiService);
	private readonly localStorage = inject(LocalStorageService);

	private readonly todosSubject$ = new BehaviorSubject<ITodo[]>([]);
	public readonly todosObservable$ = this.todosSubject$.asObservable();

	private readonly localStorageTodosKey = 'todos';

	private setDataToLocalStorageTodosSubject(todosArray: ITodo[]): void {
		this.localStorage.saveDataToLocalStorage<ITodo[]>(this.localStorageTodosKey, todosArray);
		this.todosSubject$.next(todosArray);
	};

	public loadTodos() {
		const loccalStorageTodos = this.localStorage.getDataFromLocalStorage<ITodo[]>(this.localStorageTodosKey);

		if (loccalStorageTodos) {
			this.todosSubject$.next(loccalStorageTodos);
		} else {
			this.todosApiService.getTodos().subscribe(
				(todoData: ITodo[]) => {
					this.setDataToLocalStorageTodosSubject(todoData.slice(1, 11));
				});
		}
	};

	public createTodo(todo: ITodo) {
		const todoExisting = this.todosSubject$.value.find(
			currentElement => currentElement.title === todo.title
		);

		if (todoExisting === undefined) {
			const newTodosArray = [...this.todosSubject$.value, todo];
			this.setDataToLocalStorageTodosSubject(newTodosArray);
		} else alert('Такой todo уже есть');
	};

	public editTodo(todo: ITodo) {
		const index = this.todosSubject$.value.findIndex(el => el.id === todo.id);
		this.todosSubject$.value[index] = todo;

		this.setDataToLocalStorageTodosSubject(this.todosSubject$.value);
	};

	public deleteTodo(todoId: number) {
		const findTodo = this.todosSubject$.value.find(todo => todo.id === todoId);
		const deleteTodo = this.todosSubject$.value.filter(todo => todo.id !== todoId);

		if (findTodo && confirm('Вы действительно хотите удалить этот todo?')) {
			this.setDataToLocalStorageTodosSubject(deleteTodo);
		}

		if (!this.todosSubject$.value.length) { 
			this.localStorage.removeLocalStorage(this.localStorageTodosKey);
		}
	};
}
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ITodo } from "../interfaces/todo.interface";
import { LocalStorageService } from "./localStorage.service";
import { TodosApiService } from "./todos-api.service";

@Injectable({ providedIn: 'root' })

export class TodosService {
	private readonly todosApiService = inject(TodosApiService);
	private readonly localStorage = inject(LocalStorageService);

	private readonly todosSubject$ = new BehaviorSubject<ITodo[]>([]);
	public readonly todosObservable$ = this.todosSubject$.asObservable();

	private readonly localStorageTodoKey = 'todos';

	loadTodos() {
		const loccalStorageTodos = this.localStorage.getUsersFromLocalStorage<ITodo[]>(this.localStorageTodoKey);

		if (loccalStorageTodos) {
			this.todosSubject$.next(loccalStorageTodos);
		} else {
			this.todosApiService.getTodos().subscribe(
				(todoData: ITodo[]) => {
					this.localStorage.saveUsersToLocalStorage<ITodo[]>(this.localStorageTodoKey, todoData.slice(1, 11));
					this.todosSubject$.next(todoData.slice(1, 11));
				});
		}
	};

	createTodo(todo: ITodo) {
		const todoExisting = this.todosSubject$.value.find(
			currentElement => currentElement.title === todo.title
		);

		if (todoExisting === undefined) {
			const newTodo = [...this.todosSubject$.value, todo];
			this.localStorage.saveUsersToLocalStorage<ITodo[]>(this.localStorageTodoKey, newTodo);
			this.todosSubject$.next(newTodo);
		} else alert('Такой todo уже есть');

	};

	editTodo(todo: ITodo) {
		const index = this.todosSubject$.value.findIndex(el => el.id === todo.id);
		this.todosSubject$.value[index] = todo;

		this.localStorage.saveUsersToLocalStorage<ITodo[]>(this.localStorageTodoKey, this.todosSubject$.value);
		this.todosSubject$.next(this.todosSubject$.value);
	};

	deleteTodo(todoId: number) {
		const findTodo = this.todosSubject$.value.find(todo => todo.id === todoId);
		const deleteTodo = this.todosSubject$.value.filter(todo => todo.id !== todoId);

		if (findTodo && confirm('Вы действительно хотите удалить этот todo?')) {
			this.localStorage.saveUsersToLocalStorage<ITodo[]>(this.localStorageTodoKey, deleteTodo);
			this.todosSubject$.next(deleteTodo);
		}

		if (!this.todosSubject$.value.length) {
			this.localStorage.removeLovalStorage(this.localStorageTodoKey);
		}
	};
}
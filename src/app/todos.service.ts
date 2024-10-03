import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ITodo } from "./Interfaces/ITodoInterface";

@Injectable({ providedIn: 'root' })

export class TodosService {
	private readonly todosSubject$ = new BehaviorSubject<ITodo[]>([]);
	public readonly todosObservable$ = this.todosSubject$.asObservable();

	getTodo(todos: ITodo[]) {
		this.todosSubject$.next(todos)
	}

	createTodo(todo: ITodo) {
		const todoExisting = this.todosSubject$.value.find(
			currentElement => currentElement.title === todo.title
		)

		if (todoExisting === undefined) {
			console.log('Done');
			this.todosSubject$.next([...this.todosSubject$.value, todo])
		} else alert('Такой todo уже есть')

	}

	editTodo(todo: ITodo) {
		this.todosSubject$.next(
			this.todosSubject$.value.map(
				item => (item.id === todo.id) ? todo : item
			)
		)
	}

	deleteTodo(todoId: number) {
		this.todosSubject$.next(
			this.todosSubject$.value.filter(item => item.id !== todoId)
		)
	}
}
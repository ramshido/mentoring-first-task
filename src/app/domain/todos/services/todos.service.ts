import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ITodo } from "../interfaces/todo.interface";

@Injectable({ providedIn: 'root' })

export class TodosService {
	private readonly todosSubject$ = new BehaviorSubject<ITodo[]>([]);
	public readonly todosObservable$ = this.todosSubject$.asObservable();

	public loadTodos(todosArray: ITodo[]) {
		this.todosSubject$.next(todosArray);
	};

	public createTodo(todo: ITodo) {
		const todoExisting = this.todosSubject$.value.find(
			currentElement => currentElement.title === todo.title
		);

		if (todoExisting === undefined) {
			const newTodosArray = [...this.todosSubject$.value, todo];
			this.todosSubject$.next(newTodosArray);
		} else alert('Такой todo уже есть');
	};

	public editTodo(todo: ITodo) {
		const index = this.todosSubject$.value.findIndex(el => el.id === todo.id);
		this.todosSubject$.value[index] = todo;
		this.todosSubject$.next(this.todosSubject$.value);
	};

	public deleteTodo(todoId: number) {
		const findTodo = this.todosSubject$.value.find(todo => todo.id === todoId);
		const deleteTodo = this.todosSubject$.value.filter(todo => todo.id !== todoId);

		if (findTodo && confirm('Вы действительно хотите удалить этот todo?')) {
			this.todosSubject$.next(deleteTodo);
		}
	};
}
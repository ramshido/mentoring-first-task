import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ITodo } from "./todos-list/todos-list.component";

@Injectable({providedIn: 'root'})

export class TodosService {
	todosSubject = new BehaviorSubject<ITodo[]>([]);

	setTodo(todos: ITodo[]) {
		this.todosSubject.next(todos)
	}

	createTodo(todo: ITodo) {
		this.todosSubject.next([...this.todosSubject.value, todo])
	}

	editTodo(todo: ITodo) {
		this.todosSubject.next(
			this.todosSubject.value.map(
				item => (item.id === todo.id) ? todo : item
			)
		)
	}

	deleteTodo(todoId: number) {
		this.todosSubject.next(
			this.todosSubject.value.filter(item => item.id !== todoId)
		)
	}
}
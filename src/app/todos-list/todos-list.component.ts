import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosApiService } from '../services/todos-api.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { TodosCardComponent } from './todos-card/todos-card.component';
import { TodosService } from '../services/todos.service';
import { CreateTodoFormComponent } from '../create-todo-form/create-todo-form.component';
import { ITodo } from '../interfaces/todo.interface';



@Component({
	selector: 'app-todos-list',
	standalone: true,
	imports: [NgFor, TodosCardComponent, AsyncPipe, CreateTodoFormComponent],
	templateUrl: './todos-list.component.html',
	styleUrl: './todos-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent {
	readonly todosApiService = inject(TodosApiService);
	readonly todosService = inject(TodosService);

	constructor() {
		this.todosApiService.getTodos().subscribe(
			(response: ITodo[]) => {
				return this.todosService.getTodo(response.slice(1, 11));
			});
	};

	public deleteTodo(id: number) {
		this.todosService.deleteTodo(id);
	};

	public createTodo(todo: ITodo) {
		this.todosService.createTodo(
			{ ...todo }
		);
	};

	public editTodo(todo: ITodo) {
		this.todosService.editTodo(
			{ ...todo }
		);
	}

}

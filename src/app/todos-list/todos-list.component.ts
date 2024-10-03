import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosApiService } from '../todos-api.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { TodosCardComponent } from './todos-card/todos-card.component';
import { TodosService } from '../todos.service';
import { CreateTodoFormComponent } from '../create-todo-form/create-todo-form.component';
import { ICreateTodo, ITodo } from '../Interfaces/ITodoInterface';



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
	readonly todosService = inject(TodosService)

	constructor() {
		this.todosApiService.getTodos().subscribe((
			response: any) => this.todosService.getTodo(response)
		)
	}

	deleteTodo(id: number) {
		this.todosService.deleteTodo(id);
	}

	createTodo(todo: ICreateTodo) {
		this.todosService.createTodo({
			userId: todo.userId,
			id: new Date().getTime(),
			title: todo.title,
		})
	}

}

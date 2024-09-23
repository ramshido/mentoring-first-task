import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosApiService } from '../todos-api.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { TodosCardComponent } from './todos-card/todos-card.component';
import { TodosService } from '../todos.service';

export interface ITodo {
	userId: number,
	id: number,
	title: string,
	completed: boolean,
}

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [NgFor, TodosCardComponent, AsyncPipe],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
	changeDetection:ChangeDetectionStrategy.OnPush
})
export class TodosListComponent {
	readonly todosApiService = inject(TodosApiService);
	readonly todosService = inject(TodosService)


	constructor() {
		this.todosApiService.getTodos().subscribe((response: any) => this.todosService.setTodo(response))
		
	}
	deleteTodo(id: any) {
		this.todosService.deleteTodo(id);
	}

}

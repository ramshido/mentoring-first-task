import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosApiService } from '../services/todos-api.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { TodosCardComponent } from './todos-card/todos-card.component';
import { TodosService } from '../services/todos.service';
import { ITodo } from '../interfaces/todo.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditTodoDialogComponent } from './create-edit-todo-dialog/create-edit-todo-dialog.component';
import { CreateTodoFormComponent } from '../create-todo-form/create-todo-form.component';



@Component({
	selector: 'app-todos-list',
	standalone: true,
	imports: [
		NgFor,
		TodosCardComponent, 
		AsyncPipe, 
		MatButtonModule,
		MatIconModule,
		CreateTodoFormComponent
	],
	templateUrl: './todos-list.component.html',
	styleUrl: './todos-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent {
	readonly todosApiService = inject(TodosApiService);
	readonly todosService = inject(TodosService);
	private readonly dialog = inject(MatDialog);

	constructor() {
		this.todosApiService.getTodos().subscribe((
			response: any) => this.todosService.getTodo(response.slice(1, 11))
		)
	}

	deleteTodo(id: number) {
		this.todosService.deleteTodo(id);
	}

	createTodo(todo: ITodo) {
		this.todosService.createTodo({
			userId: todo.userId,
			id: new Date().getTime(),
			title: todo.title,
			completed: todo.completed,
		})
	}

	public openDialog(todo?: ITodo) {
		let isEdit: boolean = false;
		if (todo) {
			isEdit = true;
		}

		const dialogRef = this.dialog.open(CreateEditTodoDialogComponent, {
			width: '600px',
			data: {
				todo: todo,
				isEdit
			},
		})
			.afterClosed()
			.subscribe(result => {
				if (isEdit && result) {
					this.todosService.editTodo(result);
				} else if (isEdit == false && result) {
					this.todosService.createTodo(result);
				}
			});
	}

}

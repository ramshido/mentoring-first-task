import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosApiService } from '../services/todos-api.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { TodosCardComponent } from './todos-card/todos-card.component';
import { TodosService } from '../services/todos.service';
import { CreateTodoFormComponent } from '../create-todo-form/create-todo-form.component';
import { ITodo } from '../interfaces/todo.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateTodoDialogComponent } from './create-todo-dialog/create-todo-dialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
	selector: 'app-todos-list',
	standalone: true,
	imports: [NgFor, TodosCardComponent, AsyncPipe, CreateTodoFormComponent, MatButtonModule, MatIconModule],
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
		this.todosService.createTodo(todo);
	};

	public editTodo(todo: ITodo) {
		this.todosService.editTodo(todo);
	}

	readonly dialog = inject(MatDialog);

	public openDialog(): void {
		const dialogRef = this.dialog.open(CreateTodoDialogComponent, {
			width: '600px',
			height: 'normal',
		});
		const dialogComponentInstance = dialogRef.componentInstance; // .componentInstance — это свойство объекта MatDialogRef, которое предоставляет доступ к экземпляру компонента, используемого в диалоговом окне.

		dialogComponentInstance.dataSubject.subscribe(data => {
			// Обрабатываем данные, полученные из диалога
			if (data) {
				console.log('Полученные данные:', data);
				this.createTodo(data);
			}
			// dialogRef.close(); для закрытия диалогового окна
		});

		// const dialogRef = this.dialog.open(CreateUserDialogComponent, {
		// 	width: '600px',
		// 	data: {name: 'hello'},
		// })
		// .afterClosed()
		// .subscribe(editResult => {
		// 	if (editResult) console.log('close dialog');
		// 	;
		// });
	}

}

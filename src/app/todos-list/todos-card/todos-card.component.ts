import { NgFor } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ITodo } from '../../interfaces/todo.interface';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-todos-card',
	standalone: true,
	imports: [NgFor],
	templateUrl: './todos-card.component.html',
	styleUrl: './todos-card.component.scss'
})
export class TodosCardComponent {
	@Input()
	public todo!: ITodo

	@Output()
	public deleteTodo = new EventEmitter<number>();

	@Output()
	public editTodo = new EventEmitter()

	public onDeleteTodo(todoId: number) {
		this.deleteTodo.emit(todoId)
	}

	readonly dialog = inject(MatDialog);

	public openDialog(): void {
		const dialogRef = this.dialog.open(EditTodoDialogComponent, {
			width: '600px',
			data: { todo: this.todo },
		})
			.afterClosed()
			.subscribe(
				(todoEditResult) => {
					console.log('The dialog was closed');
					if (todoEditResult !== undefined) {
						this.editTodo.emit(todoEditResult);
					};
				});
	}

}

import { NgFor } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTodoDialogComponent } from '../delete-todo-dialog/delete-todo-dialog.component';
import { CharacterLimiterPipe } from '../../../../../shared/pipes/character-limiter.pipe';
import { ITodo } from '../../../interfaces/todo.interface';

@Component({
	selector: 'app-todos-card',
	standalone: true,
	imports: [NgFor, CharacterLimiterPipe],
	templateUrl: './todos-card.component.html',
	styleUrl: './todos-card.component.scss'
})
export class TodosCardComponent {
	private readonly dialog = inject(MatDialog);

	@Input({ required: true })
	public todo!: ITodo;

	@Output()
	public deleteTodo = new EventEmitter<number>();

	@Output()
	public editTodo = new EventEmitter();

	public onDeleteTodo(todoId: number) {
		const deleteDialogRef = this.dialog.open(DeleteTodoDialogComponent)
			.afterClosed()
			.subscribe((todoDeleteResult: boolean) => {
				if (todoDeleteResult) {
					this.deleteTodo.emit(todoId);
				}
			});
	};

	public openDialog(): void {
		const createDialogRef = this.dialog.open(EditTodoDialogComponent, {
			width: '600px',
			data: { todo: this.todo },
		})
			.afterClosed()
			.subscribe(
				(todoEditResult) => {
					if (todoEditResult !== undefined) {
						this.editTodo.emit(todoEditResult);
					};
				});
	};

}

import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ITodo } from '../../interfaces/todo.interface';
import { completedValidator } from '../../../../shared/utils/forms-validators';

@Component({
	selector: 'app-edit-todo-dialog',
	standalone: true,
	imports: [
		NgIf,
		ReactiveFormsModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
	],
	templateUrl: './edit-todo-dialog.component.html',
	styleUrl: './edit-todo-dialog.component.scss'
})
export class EditTodoDialogComponent {
	readonly data = inject<{ todo: ITodo }>(MAT_DIALOG_DATA);

	public form = new FormGroup({
		id:  new FormControl(this.data.todo.id),
		title: new FormControl(this.data.todo.title, [Validators.required, Validators.minLength(3)]),
		userId: new FormControl(this.data.todo.userId, [Validators.required, Validators.maxLength(1), Validators.pattern('^[0-9]*$')]),
		completed: new FormControl((this.data.todo.completed === false) ? 'Нет' : 'Да', [Validators.required, completedValidator()]),
	});

	get todoWithUpdatedFields() {
		return {
			...this.form.value,
			completed: (this.form.controls['completed'].value?.toLowerCase() === 'Да'.toLowerCase()) ? true : false
		}
	}
}

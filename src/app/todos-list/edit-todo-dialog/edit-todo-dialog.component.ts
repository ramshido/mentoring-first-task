import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { completedValidator } from '../../utils/forms-validators';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { ITodo } from '../../interfaces/todo.interface';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
		title: new FormControl('', [Validators.required, Validators.minLength(3)]),
		userId: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern('^[0-9]*$')]),
		completed: new FormControl('', [Validators.required, completedValidator()]),
	})

	get todoWithUpdatedFields() {
		return {
			...this.form.value,
		}
	}
}

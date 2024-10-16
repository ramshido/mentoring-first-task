import { NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { completedValidator } from '../utils/forms-validators';

@Component({
	selector: 'app-create-todo-form',
	standalone: true,
	imports: [ReactiveFormsModule, NgIf, MatFormFieldModule, MatInputModule],
	templateUrl: './create-todo-form.component.html',
	styleUrl: './create-todo-form.component.scss'
})
export class CreateTodoFormComponent {
	// private readonly fb = inject(FormBuilder); // formBuilder

	@Output()
	createTodo = new EventEmitter()

	public form = new FormGroup({
		id: new FormControl(new Date().getTime()),
		title: new FormControl('', [Validators.required, Validators.minLength(3)]),
		userId: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern('^[0-9]*$')]),
		completed: new FormControl('', [Validators.required, completedValidator()]),
	})
	// Пример Form Builder
	// public readonly myFormBuilderForm = this.fb.group({ // formBuilder
	// 	userId: [
	// 		'',
	// 		[
	// 			Validators.required,
	// 			Validators.maxLength(1),
	// 			Validators.pattern('^[0-9]*$'),
	// 		],
	// 		[] // async function for request to server
	// 	],
	// 	title: '',
	// 	completed: '',
	// });

	private getCompletedValue(): boolean {
		return (this.form.get('completed')?.value!.trim().toLowerCase() === 'да') ? true : false;
	}

	public submitForm(): void {
		this.createTodo.emit({ ...this.form.value, completed: this.getCompletedValue() });
		this.form.reset();
	}
}

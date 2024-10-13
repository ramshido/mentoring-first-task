import { NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

export function completedValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value?.trim().toLowerCase();
		if (value === 'да' || value === 'нет') return null;
		else return { invalidCompleted: true };
	}
}

@Component({
	selector: 'app-create-todo-form',
	standalone: true,
	imports: [ReactiveFormsModule, NgIf, MatFormFieldModule, MatInputModule],
	templateUrl: './create-todo-form.component.html',
	styleUrl: './create-todo-form.component.scss'
})
export class CreateTodoFormComponent {
	private readonly fb = inject(FormBuilder); // formBuilder

	@Output()
	createTodo = new EventEmitter()

	public form = new FormGroup({
		title: new FormControl('', [Validators.required, Validators.minLength(3)]),
		userId: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern('^[0-9]*$')]),
		completed: new FormControl('', [Validators.required, completedValidator()]),
	})
	// Пример Form Builder
	public readonly myFormBuilderForm = this.fb.group({ // formBuilder
		userId: [
			'',
			[
				Validators.required,
				Validators.maxLength(1),
				Validators.pattern('^[0-9]*$'),
			],
			[] // async function for request to server
		],
		title: '',
		completed: '',
	});

	private getCompletedValue(): boolean {
		return (this.form.get('completed')?.value!.trim().toLowerCase() === 'да') ? true : false;
	}

	public submitForm(): void {
		this.createTodo.emit({ ...this.form.value, completed: this.getCompletedValue() });
		this.form.reset();
	}
}

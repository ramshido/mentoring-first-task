import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { completedValidator } from '../../../../../shared/utils/forms-validators';

@Component({
  selector: 'app-create-todo-dialog',
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
		MatIconModule,
	],
  templateUrl: './create-todo-dialog.component.html',
  styleUrl: './create-todo-dialog.component.scss'
})
export class CreateTodoDialogComponent {
	dataSubject = new Subject<any>();

	public form = new FormGroup({
		id: new FormControl(new Date().getTime()),
		title: new FormControl('', [Validators.required, Validators.minLength(3)]),
		userId: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern('^[0-9]*$')]),
		completed: new FormControl('', [Validators.required, completedValidator()]),
	})

	sendData(data: any): void {
		this.dataSubject.next(data); // Передаем данные через Subject
	}

	public closeDialog(): void {
		this.sendData(this.form.value); // Пример данных
		this.form.reset();
	}
}

import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MyErrorStateMatcher } from '../../utils/error-state-matcher';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-create-user-dialog',
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
	templateUrl: './create-user-dialog.component.html',
	styleUrl: './create-user-dialog.component.scss'
})
export class CreateUserDialogComponent {

	dataSubject = new Subject<any>(); // Создаем Subject для передачи данных

	public readonly form = new FormGroup({
		id: new FormControl(new Date().getTime()),
		name: new FormControl('', [Validators.required, Validators.minLength(2)]),
		email: new FormControl('', [Validators.required, Validators.email]),
		website: new FormControl('', [Validators.required, Validators.minLength(3)]), // null и пустая строка '' одно и тоже
		company: new FormGroup({
			name: new FormControl('', [Validators.required, Validators.minLength(2)]),
		}),
	});

	matcher = new MyErrorStateMatcher();

	sendData(data: any): void {
		this.dataSubject.next(data); // Передаем данные через Subject
	}

	public closeDialog(): void {
		this.sendData(this.form.value); // Пример данных
		this.form.reset();
	}
}

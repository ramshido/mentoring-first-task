import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		NgIf,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
	private readonly fb = inject(FormBuilder);
	private readonly authService = inject(AuthService);
	private readonly router = inject(Router);

	public readonly form = this.fb.group({
		email: this.fb.control('', {
			nonNullable: true,
			validators: [Validators.required, Validators.email],
		}),
		password: this.fb.control('', {
			nonNullable: true,
			validators: [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z0-9]{4,10}$')],
		}),
	});

	submitLogin() {
		this.authService.login(this.form.getRawValue()).subscribe({
			next: () => this.router.navigate(['admin']),
			error: (err) => alert(err.message),
		});
		this.form.reset();
	}
}

import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, throwError } from "rxjs";

interface IUser {
	email: string,
	password: string,
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private readonly router = inject(Router);

	constructor() {
		
	}

	public setToken(token: string): void {
		localStorage.setItem('token', token);
	}

	public getToken(): string | null {
		return localStorage.getItem('token');
	}

	private isLoggedIn(): boolean {
		return this.getToken() !== null;
	}

	public login(userInfo: IUser): Observable<string | boolean> {
		if (userInfo.email === 'admin@gmail.com' && userInfo.password === 'admin123') {
			this.setToken('sdfdasdfdsav34239fj9');
			return of(true);
		}
		return throwError(() => new Error('Failed Login'));
	}
}
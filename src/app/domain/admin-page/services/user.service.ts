import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IUserOrAdmin } from "../interfaces/user-admin.interface";

@Injectable({
	providedIn: 'root',
})
export class CheckAdminOrUser {
	private userOrAdminSubject$ = new BehaviorSubject<IUserOrAdmin | null>(null);
	public userOrAdmin$ = this.userOrAdminSubject$.asObservable();

	private user: IUserOrAdmin = {
		name: 'Vasya',
		email: 'vXqFP@example.com',
		isAdmin: false,
	};

	public loginAsAdmin(): void {
		this.userOrAdminSubject$.next({
			...this.user,
			isAdmin: true
		});
	};

	public loginAsUser(): void {
		this.userOrAdminSubject$.next(this.user);
	};

	public isAdmin(): boolean {
		const value = this.userOrAdminSubject$.value?.isAdmin;

		if (value != null) {
			return value;
		}
		return false
		// Или какое-то другое значение, когда это { user: null }
	};

	public logout(): void {
		this.userOrAdminSubject$.next(null);
	};
}
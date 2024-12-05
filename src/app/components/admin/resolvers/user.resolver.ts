import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { IUserData } from '../user.interface';
import { catchError, delay, EMPTY } from 'rxjs';

export const userResolver: ResolveFn<IUserData> = (route, state) => {
	const adminService = inject(AdminService);
	const router = inject(Router);

	return adminService.getPerson(route.params?.['id']).pipe(
		delay(2000),
		catchError(() => {
			router.navigate(['admin/contacts']);
			return EMPTY;
		}),
	);
};

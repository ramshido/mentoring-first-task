import { ResolveFn, Router } from '@angular/router';
import { IUserData } from '../user.interface';
import { AdminService } from '../services/admin.service';
import { inject } from '@angular/core';
import { delay } from 'rxjs';

export const usersResolver: ResolveFn<IUserData[]> = (route, state) => {
	const adminService = inject(AdminService);
	const router = inject(Router);

	return adminService.getPersonalList().pipe(
		delay(2000),
	);
};

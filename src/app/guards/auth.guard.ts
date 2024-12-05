import { CanActivateChildFn, CanDeactivateFn, Router, } from "@angular/router";
import { AdminModule } from "../components/admin/admin.module";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

// как делал раньше
// export class AuthGuard implements CanActivate, CanDeactivate<unknown> {
// 	canActivate(
// 		router: ActivatedRouteSnapshot,
// 		state: RouterStateSnapshot
// 	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
// 		return true;
// 	}
// 	canDeactivate(
// 		component: unknown,
// 		currentRoute: ActivatedRouteSnapshot,
// 		currentState: RouterStateSnapshot,
// 		nextState?: RouterStateSnapshot
// 	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
// 		return true;
// 	}
// }

const authGuardEntrance: CanActivateChildFn = (route, state) => {
	const router = inject(Router);
	const authService = inject(AuthService);

	if (!authService.isLoggedIn()) {
		router.navigate(['login']);
		return false;
	}
	return true;
}

const authGuardExit: CanDeactivateFn<AdminModule> = (
	component: AdminModule,
	currentRoute,
	currentState,
	nextState
) => {
	const authService = inject(AuthService);
	return (confirm('Вы точно хотите выйти?')) ? (authService.removeToken(), true) : false;
}

export { authGuardEntrance, authGuardExit }
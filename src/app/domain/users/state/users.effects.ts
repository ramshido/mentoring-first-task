import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersApiService } from "../services/users-api.service";
import { UsersActions } from "./users.actions";
import { map, switchMap } from "rxjs";

export const usersEffects = createEffect(
	() => {
		const usersApiService = inject(UsersApiService);
		const actions$ = inject(Actions);

		return actions$.pipe(
			ofType(UsersActions.set),
			// delay(1500),
			switchMap(
				() => usersApiService.getUsers().pipe(
					map((users) => UsersActions.loadUsersSuccess({ users }))
				)
			),
		);
	},
	{ functional: true }
);
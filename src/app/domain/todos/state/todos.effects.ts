import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TodosApiService } from "../services/todos-api.service";
import { TodosActions } from "./todos.actions";
import { map, switchMap } from "rxjs";

export const todosEffects = createEffect(
	() => {
		const todosApiService = inject(TodosApiService);
		const actions$ = inject(Actions);

		return actions$.pipe(
			ofType(TodosActions.set),
			switchMap(
				() => todosApiService.getTodos().pipe(
					map((todos) => TodosActions.loadTodosSuccess({ todos: todos.slice(0, 10) }))
				),
			),
		);
	},
	{ functional: true }
);
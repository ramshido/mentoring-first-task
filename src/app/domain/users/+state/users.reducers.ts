import { createReducer, on } from "@ngrx/store";
import { IUser } from "../interfaces/user.interface";
import { UsersActions } from "./users.actions";

const initialState: { users: IUser[] } = {
	users: [],
};

export const usersReducer = createReducer(
	initialState,
	on(UsersActions.loadUsersSuccess, (state, payLoad) => ({
		...state,
		users: payLoad.users,
	})),
	on(UsersActions.edit, (state, payLoad) => ({
		...state,
		users: state.users.map((user) => {
			if (user.id === payLoad.user.id) {
				return payLoad.user;
			} else {
				return user;
			}
		}),
	})),
	on(UsersActions.create, (state, payLoad) => ({
		...state,
		users: [...state.users, payLoad.user],
	})),
	on(UsersActions.delete, (state, payLoad) => ({
		...state,
		users: state.users.filter((user) => user.id !== payLoad.id),
	})),
);
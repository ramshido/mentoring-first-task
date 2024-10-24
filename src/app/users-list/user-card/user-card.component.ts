import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';

@Component({
	selector: 'app-user-card',
	standalone: true,
	imports: [],
	templateUrl: './user-card.component.html',
	styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
	@Input()
	public user!: IUser

	@Output()
	public deleteUser = new EventEmitter<number>()

	@Output()
	public editUser = new EventEmitter<IUser>()

	public onDeleteUser(userId: number) {
		this.dialog.open(DeleteUserDialogComponent)
			.afterClosed()
			.subscribe(editResult => {
				if (editResult) {
					console.log('карточка удалилась');
					this.deleteUser.emit(userId);
				};
			});
	}

	readonly dialog = inject(MatDialog);

	public openDialog(): void {
		const dialogRef = this.dialog.open(EditUserDialogComponent, {
			width: '600px',
			data: { user: this.user },
		})
			.afterClosed()
			.subscribe(editResult => {
				if (editResult) this.editUser.emit(editResult);
			});
	}
}

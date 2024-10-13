import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';

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
	public deleteUser = new EventEmitter()

	public onDeleteUser(userId: number) {
		this.deleteUser.emit(userId)
	}
}

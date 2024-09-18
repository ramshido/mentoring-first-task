import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todos-card',
  standalone: true,
  imports: [NgFor],
  templateUrl: './todos-card.component.html',
  styleUrl: './todos-card.component.scss'
})
export class TodosCardComponent {
	@Input()
	todo: any

	@Output()
	deleteTodo = new EventEmitter()

	onDeleteTodo(todoId: number) {
		this.deleteTodo.emit(todoId)
	}

}

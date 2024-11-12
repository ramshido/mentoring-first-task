import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '../../interfaces/todo.interface';

@Component({
  selector: 'app-todos-card',
  standalone: true,
  imports: [NgFor],
  templateUrl: './todos-card.component.html',
  styleUrl: './todos-card.component.scss'
})
export class TodosCardComponent {
	@Input()
	public todo!: ITodo

	@Output()
	public deleteTodo = new EventEmitter()

	@Output()
	public readonly editTodo = new EventEmitter<ITodo>();

	public onDeleteTodo(todoId: number) {
		this.deleteTodo.emit(todoId)
	}

}
